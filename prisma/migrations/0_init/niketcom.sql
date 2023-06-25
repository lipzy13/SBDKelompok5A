-- CreateTable
CREATE TABLE `tabel_cat_seat` (
    `id_cat_seat` INTEGER NOT NULL AUTO_INCREMENT,
    `category_seat` VARCHAR(20) NOT NULL,

    INDEX `id_cat_seat`(`id_cat_seat`),
    PRIMARY KEY (`id_cat_seat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tabel_kategori` (
    `id_kategori_show` INTEGER NOT NULL AUTO_INCREMENT,
    `kategori_show` VARCHAR(20) NOT NULL,

    INDEX `id_kategori_show`(`id_kategori_show`),
    PRIMARY KEY (`id_kategori_show`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tabel_pemesanan` (
    `waktu_booking` DATETIME(0) NOT NULL,
    `user_id` VARCHAR(6) NOT NULL,
    `booking_id` VARCHAR(6) NOT NULL,
    `show_id` VARCHAR(6) NOT NULL,
    `category_seat` INTEGER NOT NULL,
    `nama` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `qty` INTEGER NOT NULL,

    INDEX `category_seat`(`category_seat`),
    INDEX `show_id`(`show_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tabel_show` (
    `show_id` VARCHAR(6) NOT NULL,
    `nama_show` VARCHAR(255) NULL,
    `lokasi_show` VARCHAR(255) NULL,
    `waktu_mulai` TIME(0) NULL,
    `waktu_selesai` TIME(0) NULL,
    `tanggal_show` DATE NULL,
    `id_kategori_show` INTEGER NULL,
    `show_img` VARCHAR(255) NULL,

    UNIQUE INDEX `show_id_2`(`show_id`),
    INDEX `id_kategori_show`(`id_kategori_show`),
    INDEX `show_id`(`show_id`),
    PRIMARY KEY (`show_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tabel_user` (
    `user_id` VARCHAR(6) NOT NULL,
    `username` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `table_harga` (
    `id_harga` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cat_seat` INTEGER NOT NULL,
    `id_show` VARCHAR(6) NOT NULL,
    `harga` INTEGER NOT NULL,

    INDEX `id_cat_seat`(`id_cat_seat`),
    INDEX `id_harga`(`id_harga`),
    INDEX `id_show`(`id_show`),
    PRIMARY KEY (`id_harga`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tabel_pemesanan` ADD CONSTRAINT `tabel_pemesanan_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tabel_user`(`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tabel_pemesanan` ADD CONSTRAINT `tabel_pemesanan_ibfk_2` FOREIGN KEY (`show_id`) REFERENCES `tabel_show`(`show_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tabel_pemesanan` ADD CONSTRAINT `tabel_pemesanan_ibfk_3` FOREIGN KEY (`category_seat`) REFERENCES `tabel_cat_seat`(`id_cat_seat`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tabel_show` ADD CONSTRAINT `tabel_show_ibfk_1` FOREIGN KEY (`id_kategori_show`) REFERENCES `tabel_kategori`(`id_kategori_show`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `table_harga` ADD CONSTRAINT `table_harga_ibfk_1` FOREIGN KEY (`id_cat_seat`) REFERENCES `tabel_cat_seat`(`id_cat_seat`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `table_harga` ADD CONSTRAINT `table_harga_ibfk_2` FOREIGN KEY (`id_show`) REFERENCES `tabel_show`(`show_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

