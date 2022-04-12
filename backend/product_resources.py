from flask_restful import Resource, reqparse
from flask import jsonify, request

from models import ProductModel

from send import sendMessageToRM


parser = reqparse.RequestParser()

parser.add_argument('title', help='title cannot be blank', required=True)
parser.add_argument('description', help='description cannot be blank', required=True)
parser.add_argument('price', help='price cannot be blank', required=True)
parser.add_argument('image')


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

        # Checking that user is already exist or not
        if ProductModel.find_by_title(title):
            return {'message': f'Product {title} already exists'}

        # create new product
        new_product = ProductModel(
            title=title,
            description=description,
            price=price,
            image=image,
        )

        try:

            # Saving user in DB and Generating Access and Refresh token
            new_product.save_to_db()

#             sendMessageToRM(f'Product {title} was created')

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