from flask_restful import Resource, reqparse
from flask import jsonify, request
from PIL import Image
from base64 import b64decode
from io import BytesIO
from models import ProductModel, CommentModel, RattingModel

from send import sendMessageToRM


parser = reqparse.RequestParser()

parser.add_argument('title', help='title cannot be blank')
parser.add_argument('description', help='description cannot be blank' )
parser.add_argument('price', help='price cannot be blank' )
parser.add_argument('image')
parser.add_argument('imageName')
parser.add_argument('comment')
parser.add_argument('rating')
parser.add_argument('itemId')

class ProductForm(Resource):
    """
    User Registration Api
    """

    def post(self):

        data = parser.parse_args()

        title = data['title']
        description = data['description']
        price = data['price']
        image = data['image']
        imageName = data['imageName']

        im = Image.open(BytesIO(b64decode(image.split(',')[1])))
        im.save("static/" + imageName)

        # Checking that user is already exist or not
        if ProductModel.find_by_title(title):
            return {'message': f'Product {title} already exists'}

        # create new product
        new_product = ProductModel(
            title=title,
            description=description,
            price=price,
            image=imageName,
        )

        try:

            # Saving user in DB and Generating Access and Refresh token
            new_product.save_to_db()

            sendMessageToRM(f'Product {title} was created')

            return {
                'message': f'Product {title} was created',
            }

        except:

            return {'message': 'Something went wrong'}, 500


class AllProduct(Resource):

    def get(self):
        """
        return all products api
        """
        search = request.args.get('search')
        return ProductModel.return_all(search)


class DeleteProduct(Resource):

    def delete(self, id):
        """
        delete product api
        """
        return ProductModel.delete(id)


class AllComment(Resource):
    def get(self):
        itemId = request.args.get('itemId')
        return CommentModel.filter_by_item_id(itemId)

class AllRating(Resource):
    def get(self):
        itemId = request.args.get('itemId')
        return RattingModel.filter_by_item_id(itemId)


class CreateRating(Resource):
    def post(self):
        data = parser.parse_args()
        rating = data['rating']
        item_id = data['itemId']

        # create new product
        new_rating = RattingModel(
            rating=rating,
            item_id=item_id,
        )

        try:
            # Saving user in DB and Generating Access and Refresh token
            new_rating.save_to_db()

            return {
                'message': f'Rating {rating} was created',
            }

        except:

            return {'message': 'Something went wrong'}, 500


class CreateComment(Resource):
    def post(self):
        data = parser.parse_args()
        comment = data['comment']
        item_id = data['itemId']

        # create new product
        new_comment = CommentModel(
            comment=comment,
            item_id=item_id,
        )

        try:
            new_comment.save_to_db()
            return {
                'message': f'Comment {comment} was created',
            }
        except:
            return {'message': 'Something went wrong'}, 500
