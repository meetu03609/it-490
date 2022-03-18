from rest_framework import serializers

from core.models import Product


# class TagSerializer(serializers.ModelSerializer):
#     """Serializer for tag objects"""
#
#     class Meta:
#         model = Tag
#         fields = ('id', 'name')
#         read_only_fields = ('id',)
#
#
# class IngredientSerializer(serializers.ModelSerializer):
#     """Serializer for ingredient objects"""
#
#     class Meta:
#         model = Ingredient
#         fields = ('id', 'name')
#         read_only_fields = ('id',)


class ProductSerializer(serializers.ModelSerializer):
    """Serialize a recipe"""
    # ingredients = serializers.PrimaryKeyRelatedField(
    #     many=True,
    #     queryset=Ingredient.objects.all()
    # )
    # tags = serializers.PrimaryKeyRelatedField(
    #     many=True,
    #     queryset=Tag.objects.all()
    # )

    class Meta:
        model = Product
        fields = ('id', 'asin', 'title', 'score', 'sponsored', 'amazon_choice', 'amazon_prime',
                  'price', 'before_price', 'current_price', 'currency', 'rating', 'total_reviews',
                  'discounted', 'url', 'thumbnail')
        read_only_fields = ('id',)


class RecipeDetailSerializer(ProductSerializer):
    """Serializer a recipe detail"""
    # ingredients = IngredientSerializer(many=True, read_only=True)
    # tags = TagSerializer(many=True, read_only=True)
