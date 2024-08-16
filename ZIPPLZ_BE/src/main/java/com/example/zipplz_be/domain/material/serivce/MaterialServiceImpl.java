package com.example.zipplz_be.domain.material.serivce;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.file.repository.FileRepository;
import com.example.zipplz_be.domain.material.dto.MaterialDTO;
import com.example.zipplz_be.domain.material.dto.MaterialFileDTO;
import com.example.zipplz_be.domain.material.dto.MaterialViewDTO;
import com.example.zipplz_be.domain.material.entity.ElasticMaterial;
import com.example.zipplz_be.domain.material.entity.Material;
import com.example.zipplz_be.domain.material.exception.MaterialNotFoundException;
import com.example.zipplz_be.domain.material.repository.MaterialRepository;
import com.example.zipplz_be.domain.material.repository.MaterialSearchRepository;
import com.example.zipplz_be.domain.model.MaterialFileRelation;
import com.example.zipplz_be.domain.model.UserFileRelation;
import com.example.zipplz_be.domain.model.entity.MajorCategory;
import com.example.zipplz_be.domain.model.entity.MiddleCategory;
import com.example.zipplz_be.domain.model.repository.MajorCategoryRepository;
import com.example.zipplz_be.domain.model.repository.MaterialFileRelationRepository;
import com.example.zipplz_be.domain.model.repository.UserFileRelationRepository;
import com.example.zipplz_be.domain.model.service.S3Service;
import com.example.zipplz_be.domain.model.service.S3ServiceImpl;
import com.example.zipplz_be.domain.mypage.entity.Wish;
import com.example.zipplz_be.domain.mypage.repository.WishRepository;
import com.example.zipplz_be.domain.schedule.exception.S3Exception;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.exception.UserNotFoundException;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepository materialRepository;
    private final FileRepository fileRepository;
    private final MajorCategoryRepository majorCategoryRepository;
    private final MaterialFileRelationRepository materialFileRelationRepository;
    private final S3Service s3Service;
    private final UserRepository userRepository;
    private final UserFileRelationRepository userFileRelationRepository;
    private final WishRepository wishRepository;
    private final MaterialSearchRepository materialSearchRepository;

//    @Override
//    public List<MaterialViewDTO> getMaterialList() {
//        List<MaterialViewDTO> materialViews = new ArrayList<>();
//        List<MaterialDTO> materials = materialRepository.getMaterialList();
//        for (MaterialDTO material : materials) {
//            List<MaterialFileDTO> files = fileRepository.getMaterialImg(material.getMaterialSerial());
//            String img = null;
//            if (!files.isEmpty()) {
//                img = files.getFirst().getSaveFile();
//            }
//            MaterialViewDTO materialView = new MaterialViewDTO(material, img);
//            materialViews.add(materialView);
//        }
//        return materialViews;
//    }

    @Override
    public List<MaterialViewDTO> getMaterialList(String category) {

        String majorName = category.equals("wall") ? "벽면재" : "바닥재";
        MajorCategory majorCategory = majorCategoryRepository.findByMajorName(majorName);
        List<Material> materials = (!category.isEmpty()) ? materialRepository.findAllByMajorCategory(majorCategory) : materialRepository.findAll();

        return createMaterialViewDTOList(materials, Collections.emptyList());
    }

    @Override
    public List<MaterialViewDTO> getMaterialListAuthenticated(String category, int userSerial) {
        System.out.println("unlogined User!!!!!!!!!!!!!!!!!!!11");
        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UserNotFoundException("존재하지 않는 유저입니다.");
        }
        User user = userRepository.findByUserSerial(userSerial);

        List<Integer> wishSerialList = wishRepository.findAllByUserSerialAndWishType(user, 4).stream()
                .map(Wish::getWishSerial)
                .collect(Collectors.toList());

        return getMaterialListWithWish(category, wishSerialList);
    }

    private List<MaterialViewDTO> getMaterialListWithWish(String category, List<Integer> wishSerialList) {

        String majorName = category.equals("wall") ? "벽면재" : "바닥재";
        MajorCategory majorCategory = majorCategoryRepository.findByMajorName(majorName);
        List<Material> materials = (!category.isEmpty()) ? materialRepository.findAllByMajorCategory(majorCategory) : materialRepository.findAll();

        return createMaterialViewDTOList(materials, wishSerialList);
    }

    private List<MaterialViewDTO> createMaterialViewDTOList(List<Material> materials, List<Integer> wishSerialList) {
        return materials.stream()
                .map(material -> {
                    MaterialFileRelation relation = materialFileRelationRepository.findFirstByMaterialSerial(material);
                    boolean isInWishList = wishSerialList.contains(material.getMaterialSerial());

                    return MaterialViewDTO.builder()
                            .materialSerial(material.getMaterialSerial())
                            .materialName(material.getMaterialName())
                            .majorCategory(material.getMajorCategory().getMajorCode())
                            .description(material.getDescription())
                            .materialPrice(material.getMaterialPrice())
                            .img((relation != null) ? relation.getFileSerial() : null)
                            .isWished(isInWishList)
                            .build();
                })
                .sorted(Comparator.comparing(MaterialViewDTO::isWished).reversed())
                .collect(Collectors.toList());
    }


    @Override
    public void saveConvertedImage(MultipartFile image, int userSerial) {

        if (image.isEmpty() || Objects.isNull(image.getOriginalFilename())) {
            throw new S3Exception("파일이 비었습니다.");
        }
        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UserNotFoundException("존재하지 않는 유저입니다.");
        }

        User user = userRepository.findByUserSerial(userSerial);

        String url = s3Service.uploadImage(image);
        File file = fileRepository.findBySaveFile(url);

        UserFileRelation userFileRelation = UserFileRelation.builder()
                .user(user)
                .file(file)
                .build();
        System.out.println(file.toString());

        userFileRelationRepository.save(userFileRelation);
    }

    @Override
    public List<File> getConvertedImages(int userSerial) {

        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UserNotFoundException("존재하지 않는 유저입니다.");
        }
        User user = userRepository.findByUserSerial(userSerial);
        if (!userFileRelationRepository.existsByUser(user)) {
            return null;
        }

        return userFileRelationRepository.findAllByUser(user).stream()
                .map(UserFileRelation::getFile)
                .collect(Collectors.toList());
    }

    @Override
    public void setMaterialOnWish(int userSerial, int materialSerial) {

        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UserNotFoundException("존재하지 않는 유저입니다.");
        }
        User user = userRepository.findByUserSerial(userSerial);

        Wish wish = Wish.builder()
                .userSerial(user)
                .wishType(4)
                .wishSerial(materialSerial).build();
        wishRepository.save(wish);
    }

    @Override
    @Transactional
    public void unsetMaterialOnWish(int userSerial, int materialSerial) {

        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UserNotFoundException("존재하지 않는 유저입니다.");
        }
        User user = userRepository.findByUserSerial(userSerial);

        if (wishRepository.existsByUserSerialAndWishTypeAndWishSerial(user, 4, materialSerial)) {
            wishRepository.deleteByUserSerialAndWishTypeAndWishSerial(user, 4, materialSerial);
        } else {
            throw new MaterialNotFoundException("존재하지 않는 자재입니다.");
        }
    }

    @Override
    @Transactional
    public void insertMaterialService(Map<String, Object> params) {
        Material material = Material.builder()
                .description((String) params.get("description"))
                .materialName((String) params.get("materialName"))
                .materialPrice((Integer) params.get("materialPrice"))
                .build();

        materialRepository.save(material);

        ElasticMaterial elasticMaterial = ElasticMaterial.builder()
                .materialName(material.getMaterialName())
                .materialPrice(material.getMaterialPrice())
                .materialSerial(material.getMaterialSerial())
                .description(material.getDescription())
                .build();

        materialSearchRepository.save(elasticMaterial);
    }

    // @Override
    // public List<ElasticMaterial> searchMaterialService(Map<String, Object> params) {
    //     List<ElasticMaterial> elasticMaterials =  materialSearchRepository.findByMaterialName((String) params.get("searchWord"));

    //     return elasticMaterials;
    // }
}
