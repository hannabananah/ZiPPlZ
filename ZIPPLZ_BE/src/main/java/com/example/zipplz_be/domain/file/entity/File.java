package com.example.zipplz_be.domain.file.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_serial")
    private int fileSerial;
    @Column(name = "save_folder")
    private String saveFolder;
    @Column(name = "original_file")
    private String originalFile;
    @Column(name = "save_file")
    private String saveFile;
}
