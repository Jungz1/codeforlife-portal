from wagtail.core.blocks import StructBlock, TextBlock


class CloudStorageImageBlock(StructBlock):
    image_path = TextBlock()
    alt_text = TextBlock()

    class Meta:
        template = "blocks/cloud_storage_image.html"
