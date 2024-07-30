package com.example.zipplz_be.domain.model.service;

import com.example.zipplz_be.domain.model.dto.FieldDTO;
import com.example.zipplz_be.domain.model.dto.GugunDTO;
import com.example.zipplz_be.domain.model.dto.SidoDTO;
import com.example.zipplz_be.domain.model.entity.Field;
import com.example.zipplz_be.domain.model.entity.Gugun;
import com.example.zipplz_be.domain.model.repository.FieldRepository;
import com.example.zipplz_be.domain.model.repository.LocalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultServiceImpl implements DefaultService {

    private final LocalRepository localRepository;
    private final FieldRepository fieldRepository;

    public DefaultServiceImpl(LocalRepository localRepository, FieldRepository fieldRepository) {
        this.localRepository = localRepository;
        this.fieldRepository = fieldRepository;
    }

    @Override
    public List<SidoDTO> getSidoList() {
        return localRepository.getSidoList();
    }

    @Override
    public List<GugunDTO> getGugunList(int Sido) {
        return localRepository.getGugunList(Sido);
    }

    @Override
    public List<FieldDTO> getFieldList() {
        return fieldRepository.getFields();
    }
}
