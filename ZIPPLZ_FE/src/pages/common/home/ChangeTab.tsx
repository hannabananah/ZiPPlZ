import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';

import Button from '@/components/common/Button';
import Selectbar from '@/components/common/Selectbar';
import '@assets/scss/App.scss';
import Stage from '@components/Stage';
import { modelScaleProps } from '@components/helpers/Interfaces';
// import { onnxMaskToImage } from '@components/helpers/maskUtils';
// import { modelData } from '@components/helpers/onnxModelAPI';
import { handleImageScale } from '@components/helpers/scaleHelper';
import AppContext from '@components/hooks/createContext';
import MaterialList from '@components/imageChange/MaterialList';

/* @ts-ignore */
import npyjs from 'npyjs';
import { InferenceSession, Tensor } from 'onnxruntime-web';
import onnxruntimeWeb from 'onnxruntime-web';

// import * as ort from 'onnxruntime-web';

const ort = onnxruntimeWeb;
const IMAGE_EMBEDDING = '/assets/data/cake_embedding.npy';
const MODEL_DIR = '/model/sam_onnx_example.onnx';
export default function ChangeTab() {
  const options: string[] = ['바닥', '벽지'];
  const [selectedValue, setSelectedValue] = useState<string>('바닥');
  const {
    clicks: [clicks],
    image: [, setImage],
    // maskImg: [setMaskImg],
  } = useContext(AppContext)!;
  const [model, setModel] = useState<InferenceSession | null>(null); // ONNX model
  const [tensor, setTensor] = useState<Tensor | null>(null); // Image embedding tensor

  // The ONNX model expects the input to be rescaled to 1024.
  // The modelScale state variable keeps track of the scale values.
  const [modelScale, setModelScale] = useState<modelScaleProps | null>(null);
  const [isMainImgUpload, setIsMainImgUpload] = useState<boolean>(false);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false); // Control file input visibility
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );
  const [maskImage, setMaskImage] = useState<HTMLImageElement | null>(null);
  console.log(setMaskImage);
  const [materialImage, setMaterialImage] = useState<HTMLImageElement | null>(
    null
  );
  const [editingImage, setEditingImage] = useState<string | null>(null);
  // const [selectmask, setSelectMask] = useState<string | null>(null);

  // Initialize the ONNX model and load the SAM pre-computed image embedding
  useEffect(() => {
    const initModel = async () => {
      try {
        fetchTest();
        if (MODEL_DIR === undefined) return;
        const URL: string = MODEL_DIR;
        const model = await InferenceSession.create(URL);
        setModel(model);
      } catch (e) {
        console.log(e);
      }
    };
    initModel();

    // EMBEDDING MODEL LOAD 시
    // Load the Segment Anything pre-computed embedding
    Promise.resolve(loadNpyTensor(IMAGE_EMBEDDING)).then((embedding) =>
      setTensor(embedding)
    );
  }, []);
  useEffect(() => {}, [model]);
  // EMDEDDING MODEL LOAD 시
  // Decode a Numpy file into a tensor.
  const loadNpyTensor = async (tensorFile: string) => {
    let npLoader = new npyjs();
    const npArray = await npLoader.load(tensorFile);
    const tensor = new ort.Tensor('float32', npArray.data, npArray.shape);
    return tensor;
  };
  const fetchTest = async () => {
    const response = await fetch('http://localhost:5001/ai/test', {
      method: 'GET',
    });
    return response;
  };
  const handleOriginalFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setIsMainImgUpload(true);
    if (file) {
      setIsFileUploaded(false);

      loadOriginalImage(file);
    }
  };
  const loadOriginalImage = async (file: File) => {
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const { height, width, samScale } = handleImageScale(img);
        setModelScale({
          height: height,
          width: width,
          samScale: samScale,
        });
        img.width = width;
        img.height = height;
        setImage(img);
        setOriginalImage(img);

        // // EMBEDDING MODEL LOAD 시
        // embeddingImageAPI(file);
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    runONNX();
  }, [clicks, tensor]);

  const runONNX = async () => {
    try {
      if (
        model === null ||
        clicks === null ||
        tensor === null ||
        modelScale === null
      ) {
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMaterialImgEditing = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      await loadMaterialImage(file);
    }
  };
  useEffect(() => {
    if (maskImage) {
      setIsFileUploaded(true);
    }
  }, [maskImage]);

  const loadMaterialImage = async (file: File) => {
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const { height, width, samScale } = handleImageScale(img);
        setModelScale({
          height: height,
          width: width,
          samScale: samScale,
        });
        img.width = width;
        img.height = height;
        setMaterialImage(img);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const editingImageAPI = async () => {
    const formData = new FormData();
    if (originalImage) {
      const originalImageBlob = await fetch(originalImage.src).then((res) =>
        res.blob()
      );
      formData.append(
        'original_image',
        originalImageBlob,
        'original_image.png'
      );
    }

    if (maskImage) {
      const maskImageBlob = await imageToBlob(maskImage);
      formData.append('mask_image', maskImageBlob, 'mask_image.png');
    }

    if (materialImage) {
      const materialImageBlob = await fetch(materialImage.src).then((res) =>
        res.blob()
      );
      formData.append(
        'material_image',
        materialImageBlob,
        'material_image.png'
      );
    }

    try {
      const response = await fetch('http://localhost:5001/ai/editing', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Editing API request failed');
      }
      const data = await response.json();

      if (data && data.editing.images && data.editing.images.length > 0) {
        setEditingImage(data.editing.images[0].image);
      } else {
        setEditingImage(null);
      }
    } catch (error) {
      console.error('Error calling Editing API:', error);
    }
  };

  const imageToBlob = async (image: HTMLImageElement): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      context.drawImage(image, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const threshold = 128;

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

        const value = avg >= threshold ? 0 : 255;

        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }

      context.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert image to blob'));
        }
      }, 'image/png');
    });
  };

  return (
    <>
      <div className="flex flex-col w-full gap-4 mt-2 mb-[5rem]">
        <div className="flex justify-between w-full">
          <p className="font-bold text-zp-md">
            1. 바꾸고 싶은 집 사진을 올려주세요.
          </p>
          <p className="font-bold text-zp-md">
            2. 자재를 선택 또는 올려주세요.
          </p>
        </div>
        <div className="flex w-full h-full gap-4">
          <div className="flex flex-col w-full h-full gap-4 basis-2/3">
            <div className="relative flex items-center justify-center w-full border rounded-zp-radius-big border-zp-main-color aspect-square ">
              {' '}
              {!isMainImgUpload ? (
                <div className="flex items-center justify-center w-full ">
                  <label htmlFor="dropzone-file">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer">
                      <svg
                        className="w-12 h-12 mb-4 text-gray-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-zp-md text-zp-gray">
                        집 이미지를 올려주세요.
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/*"
                      onChange={handleOriginalFileChange}
                      style={{
                        display: 'none',
                        visibility: 'hidden',
                        margin: '20px 0',
                      }}
                    />
                  </label>
                </div>
              ) : editingImage ? (
                <>
                  <img src={editingImage} className="w-full aspect-square" />
                  <div
                    className="border bg-slate-900 w-[2rem] aspect-square absolute top-0 right-0"
                    onClick={() => {
                      setIsMainImgUpload(false);
                      setEditingImage(null);
                      setMaterialImage(null);
                    }}
                  />
                </>
              ) : (
                <Stage />
              )}
            </div>
            <div className="flex w-full h-full gap-4">
              <div className="w-[50%] aspect-square border rounded-zp-radius-big">
                {materialImage ? (
                  <img
                    src={materialImage.src}
                    className="w-full aspect-square"
                  />
                ) : (
                  '자재 이미지 올라오는 곳'
                )}
              </div>
              <div className="w-[50%] aspect-squarel grid grid-rows-2 gap-4">
                <Button
                  buttonType="second"
                  children="변환하기"
                  width="full"
                  height="full"
                  radius="big"
                  fontSize="lg"
                  onClick={editingImageAPI}
                />
                <Button
                  buttonType="second"
                  children="저장하기"
                  width="full"
                  height="full"
                  radius="big"
                  fontSize="lg"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 basis-1/3 ">
            <Selectbar
              backgroundColor="white"
              border="main"
              radius="btn"
              fontColor="black"
              options={options}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              width="full"
              height={2}
              fontSize="lg"
              hover="light-gray"
            />
            {isFileUploaded && (
              <label form="dropzone-file2">
                <div className="w-full h-[1.5rem] flex justify-center items-center bg-zp-sub-color rounded-zp-radius-btn cursor-pointer">
                  <CiCirclePlus size={16} />
                  <input
                    id="dropzone-file2"
                    type="file"
                    className="hidden"
                    onChange={handleMaterialImgEditing}
                  />
                </div>
              </label>
            )}
            <div
              className="flex w-full h-full overflow-auto border-t border-b aspect-square rounded-b-zp-radius-big border-b-zp-main-color border-t-zp-main-color"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              <MaterialList type={selectedValue} />
            </div>
          </div>
        </div>
      </div>{' '}
    </>
  );
}
