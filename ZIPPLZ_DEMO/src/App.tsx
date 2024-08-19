import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import { InferenceSession, Tensor } from "onnxruntime-web";
import "./assets/scss/App.scss";
import { handleImageScale } from "./components/helpers/scaleHelper";
import { modelScaleProps } from "./components/helpers/Interfaces";
import { onnxMaskToImage } from "./components/helpers/maskUtils";
import { modelData } from "./components/helpers/onnxModelAPI";
import Stage from "./components/Stage";
import AppContext from "./components/hooks/createContext";
import MaterialList from "./components/imageChange/MaterialList";
import Selectbar from "./components/common/Selectbar";
import { IoArrowBackSharp } from "react-icons/io5";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useParams,
} from "react-router-dom";
import Button from "./components/common/Button1";
import { RxReset } from "react-icons/rx";
const FormData = require("form-data");

const ort = require("onnxruntime-web");
/* @ts-ignore */
import npyjs from "npyjs";
import axios from "axios";

// URL 파라미터를 처리하는 ImageChange 컴포넌트
const ImageChange = () => {
    const { userSerial } = useParams<{ userSerial: string }>();
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab");

    return (
        <div>
            <h1>Image Change Component</h1>
            <p>User Serial: {userSerial}</p>
            <p>Tab: {tab}</p>
        </div>
    );
};

// const IMAGE_EMBEDDING = "/assets/data/ssafy1_embedding.npy";
const MODEL_DIR = "/model/sam_onnx_example.onnx";

const App = () => {
    const options: string[] = ["바닥", "벽지"];
    const [selectedValue, setSelectedValue] = useState<string>("바닥");
    const {
        clicks: [clicks],
        image: [, setImage],
        maskImg: [, setMaskImg],
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
    const [materialImage, setMaterialImage] = useState<HTMLImageElement | null>(
        null
    );
    const [editingImage, setEditingImage] = useState<string | null>(null);
    // const [selectmask, setSelectMask] = useState<string | null>(null);

    // Initialize the ONNX model and load the SAM pre-computed image embedding
    useEffect(() => {
        const initModel = async () => {
            try {
                if (MODEL_DIR === undefined) return;
                console.log(`Loading model from: ${MODEL_DIR}`);
                const URL: string = MODEL_DIR;
                const model = await InferenceSession.create(URL);
                setModel(model);
            } catch (e) {
                console.log(e);
            }
        };
        initModel();

        // // EMBEDDING MODEL LOAD 시
        // // Load the Segment Anything pre-computed embedding
        // Promise.resolve(loadNpyTensor(IMAGE_EMBEDDING, "float32")).then(
        //     (embedding) => setTensor(embedding)
        // );
    }, []);

    // // EMDEDDING MODEL LOAD 시
    // // Decode a Numpy file into a tensor.
    // const loadNpyTensor = async (tensorFile: string, dType: string) => {
    //     let npLoader = new npyjs();
    //     const npArray = await npLoader.load(tensorFile);
    //     const tensor = new ort.Tensor(dType, npArray.data, npArray.shape);
    //     return tensor;
    // };

    // Handle file input change
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
                    height: height, // original image height
                    width: width, // original image width
                    samScale: samScale, // scaling factor for image which has been resized to longest side 1024
                });
                img.width = width;
                img.height = height;
                setImage(img);
                setOriginalImage(img);

                // EMBEDDING MODEL LOAD 시
                embeddingImageAPI(file);
            };
        } catch (error) {
            console.log(error);
        }
    };

    // EMBEDDING MODEL LOAD 시
    const embeddingImageAPI = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("Embedding API request 요청 ... ");
            const response = await fetch("https://zipplz.site/ai/segment", {
                method: "POST",
                body: formData,
                // mode: 'no-cors'
            });

            if (!response.ok) {
                throw new Error("Embedding API request failed");
            }
            console.log("Embedding API response 완료 !!!");
            const data = await response.json();

            const { embedding, shape } = data;
            const embedding_img = await loadNpyTensor(
                embedding,
                shape,
                "float32"
            );
            setTensor(embedding_img);
        } catch (error) {
            console.error("Error calling Embedding API:", error);
        }
    };

    // EMBEDDING MODEL LOAD 시
    // Decode a Numpy file into a tensor.
    const loadNpyTensor = async (
        data: number[],
        shape: number[],
        dType: string
    ) => {
        const tensorData = new Float32Array(data);
        const tensor = new ort.Tensor(dType, tensorData, shape);
        return tensor;
    };

    // Run the ONNX model every time clicks has changed
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
            )
                return;
            else {
                // Prepare the model input in the correct format for SAM.
                const feeds = modelData({
                    clicks,
                    tensor,
                    modelScale,
                });

                if (feeds === undefined) return;
                // Run the SAM ONNX model with the feeds returned from modelData()
                const results = await model.run(feeds);
                const output = results[model.outputNames[0]];

                // The predicted mask returned from the ONNX model is an array which is
                // rendered as an HTML image using onnxMaskToImage() from maskUtils.tsx.
                const selectedImage = onnxMaskToImage(
                    output.data,
                    output.dims[2],
                    output.dims[3]
                );

                setMaskImage(selectedImage);
                setMaskImg(selectedImage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    // Handle img edit
    const handleMaterialImgEditing = async (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            await loadMaterialImage(file);
        }
    };
    useEffect(() => {
        console.log(isMainImgUpload);
    }, [isMainImgUpload]);
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
                    height: height, // original image height
                    width: width, // original image width
                    samScale: samScale, // scaling factor for image which has been resized to longest side 1024
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
            const originalImageBlob = await fetch(originalImage.src).then(
                (res) => res.blob()
            );
            formData.append(
                "original_image",
                originalImageBlob,
                "original_image.png"
            );
        }

        if (maskImage) {
            // Convert maskImage to Blob
            const maskImageBlob = await imageToBlob(maskImage);
            formData.append("mask_image", maskImageBlob, "mask_image.png");
        }

        if (materialImage) {
            const materialImageBlob = await fetch(materialImage.src).then(
                (res) => res.blob()
            );
            formData.append(
                "material_image",
                materialImageBlob,
                "material_image.png"
            );
        }

        try {
            console.log("Editing API request 요청 ... ");
            const response = await fetch("https://zipplz.site/ai/editing", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Editing API request failed");
            }
            console.log("Editing API response 완료 !!!");

            // const maskUrl = `data:image/png;base64,${data.mask}`;

            // if (data && data.editing.images && data.editing.images.length > 0) {
            //     console.log("11111 : ",data);
            //     setEditingImage(data.editing.images[0].image);

            //     sendStringToServer(data.editing.images[0].image);
            //     // downloadImageAndSend(data.editing.images[0].image)

            // } else {
            //     console.log("No images found in API Response.");
            //     setEditingImage(null);
            // }

            // Blob으로 변환
            const imageBlob = await response.blob();
            console.log("imageBlob : ", imageBlob);

            // Blob을 File 객체로 변환 (파일명과 타입을 지정할 수 있습니다.)
            const imageFile = new File([imageBlob], "edited_image.png", {
                type: "image/png",
            });

            // 서버로 File 객체를 전송
            await sendStringToServer(imageFile);
            console.log("저장 완료!!!");
            setEditingImage(URL.createObjectURL(imageBlob));
        } catch (error) {
            console.error("Error calling Editing API:", error);
        }
    };

    const imageToBlob = async (image: HTMLImageElement): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext("2d");
            if (!context) {
                reject(new Error("Failed to get canvas context"));
                return;
            }
            context.drawImage(image, 0, 0);

            // Get the image data from the canvas
            const imageData = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
            const data = imageData.data;

            // Define the threshold value
            const threshold = 128; // Adjust this value as needed (0-255)

            // Convert image data to black and white
            for (let i = 0; i < data.length; i += 4) {
                // Calculate the grayscale value
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

                // Apply the threshold to convert to black or white
                const value = avg >= threshold ? 0 : 255;

                data[i] = value; // Red channel
                data[i + 1] = value; // Green channel
                data[i + 2] = value; // Blue channel
                // Alpha channel (data[i + 3]) is not changed
            }

            // Put the modified image data back to the canvas
            context.putImageData(imageData, 0, 0);

            // Convert the canvas to a Blob
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Failed to convert image to blob"));
                }
            }, "image/png"); // Specify the MIME type if necessary
        });
    };

    const sendStringToServer = async (file: File) => {
        console.log("file :", file);
        const formData = new FormData();
        formData.append("image", file);
        console.log("Asdfasdf");
        try {
            console.log("saveImage API request 요청 ... ");
            return await axios.post(
                `https://zipplz.site/api/materials`,
                formData,
                {
                    headers: {
                        // Authorization: `Bearer ${localStorage.getItem('token')}`
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5vdHNob3cwNDExQG5hdmVyLmNvbSIsInVzZXJTZXJpYWwiOjE4LCJyb2xlIjoiIiwibmFtZSI6Imtub3RzaG93IiwiaWF0IjoxNzIzNzE3OTc3LCJleHAiOjE3MjQzMTc5Nzd9.p6W-MYEm4eOkMJlj6ZrtaM4iOTUBNGdvhGsqQdP6MLE`,
                    },
                }
            );
        } catch (error) {
            console.error("Error calling Embedding API:", error);
        }
    };

    // const [isSave, setIsSave] = useState<boolean>(false);
    // const handlClickSave = () => {
    //     // if result == 1: 저장 완료
    //     // else == 0: 저장 실패
    // };
    const shiftLocal = () => {
        window.location.href = "http://localhost:5173/";
    };
    return (
        <div>
            <div className="p-6 flex flex-col w-full gap-4 mt-2 mb-[5rem] relative">
                <IoArrowBackSharp
                    size={16}
                    className="absolute cursor-pointer top-1 left-1"
                    onClick={shiftLocal}
                />
                <div className="flex justify-between w-full">
                    <p className="font-bold text-zp-md">
                        1. 바꾸고 싶은 집 사진을 올려주세요.
                    </p>
                    <p className="font-bold text-zp-md">
                        2. 자재를 선택 또는 올려주세요.
                    </p>
                </div>
                <div className="flex w-full h-full gap-4">
                    <div className="flex flex-col w-full h-full gap-4 basis-3/4">
                        <div className="relative flex items-center justify-center w-full border rounded-zp-radius-big border-zp-main-color aspect-square ">
                            {" "}
                            {!isMainImgUpload ? (
                                <>
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
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
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
                                                onChange={
                                                    handleOriginalFileChange
                                                }
                                                style={{
                                                    display: "none",
                                                    visibility: "hidden",
                                                    margin: "20px 0",
                                                }}
                                            />
                                        </label>
                                    </div>
                                </>
                            ) : editingImage ? (
                                <>
                                    <img
                                        src={editingImage}
                                        className="w-full aspect-square rounded-zp-radius-big"
                                    />
                                    <div
                                        className="bg-zp-white bg-slate-900 w-[2rem] flex items-center justify-center rounded-zp-radius-btn aspect-square absolute bottom-0 right-0"
                                        onClick={() => {
                                            setIsMainImgUpload(false);
                                            setEditingImage(null);
                                            setMaterialImage(null);
                                        }}
                                    >
                                        <RxReset size={24} />
                                    </div>
                                </>
                            ) : (
                                <div className="relative w-full h-full">
                                    <Stage />
                                    <div
                                        className="bg-zp-white bg-slate-900 w-[2rem] flex items-center justify-center rounded-zp-radius-big aspect-square absolute bottom-0 right-0"
                                        onClick={() => {
                                            setIsMainImgUpload(false);
                                            setEditingImage(null);
                                            setMaterialImage(null);
                                        }}
                                    >
                                        <RxReset size={24} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex w-full h-full gap-4">
                            <div className="w-full border aspect-video rounded-zp-radius-big">
                                {materialImage ? (
                                    <img
                                        src={materialImage.src}
                                        className="w-full h-full rounded-zp-radius-big"
                                    />
                                ) : (
                                    "자재 이미지 올라오는 곳"
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 basis-1/4 ">
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
                        <label form="dropzone-file2">
                            <div className="w-full h-[1.5rem] flex justify-center items-center bg-zp-sub-color rounded-zp-radius-btn cursor-pointer">
                                {/* <CiCirclePlus size={16} /> */}
                                자재올리기
                                {isFileUploaded && (
                                    <input
                                        id="dropzone-file2"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleMaterialImgEditing}
                                        style={{
                                            display: "none",
                                            visibility: "hidden",
                                            margin: "20px 0",
                                        }}
                                    />
                                )}
                            </div>
                        </label>
                        <div
                            className="flex w-full h-full overflow-auto border-t border-b aspect-square rounded-b-zp-radius-big border-b-zp-main-color border-t-zp-main-color"
                            style={{
                                msOverflowStyle: "none",
                                scrollbarWidth: "none",
                            }}
                        >
                            <MaterialList type={selectedValue} />
                        </div>
                        {materialImage && isFileUploaded && (
                            <Button
                                buttonType="second"
                                fontSize="sm"
                                radius="btn"
                                height={2.5}
                                onClick={editingImageAPI}
                            >
                                변환하기
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
