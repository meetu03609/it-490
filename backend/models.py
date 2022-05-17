from app import db

from passlib.hash import pbkdf2_sha256 as sha256


class UserModel(db.Model):
    """
    User Model Class
    """

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=True)
    """
    Save user details in Database
    """
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    """
    Find user by username
    """
    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
    """
    return all the user data in json form available in DB
    """
    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'username': x.username,
                'password': x.password,
                'email': x.email
            }
        return {'users': [to_json(user) for user in UserModel.query.all()]}

    """
    Delete user data
    """
    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()

            return {'message': f'{num_rows_deleted} row(s) deleted'}

        except:

            return {'message': 'Something went wrong'}

    """
    generate hash from password by encryption using sha256
    """
    @staticmethod
    def generate_hash(password):

        return sha256.hash(password)

    """
    Verify hash and password
    """
    @staticmethod
    def verify_hash(password, hash_):

        return sha256.verify(password, hash_)


class RevokedTokenModel(db.Model):
    """
    Revoked Token Model Class
    """

    __tablename__ = 'revoked_tokens'

    id = db.Column(db.Integer, primary_key=True)

    jti = db.Column(db.String(120))

    """
    Save Token in DB
    """
    def add(self):

        db.session.add(self)

        db.session.commit()

    """
    Checking that token is blacklisted
    """
    @classmethod
    def is_jti_blacklisted(cls, jti):

        query = cls.query.filter_by(jti=jti).first()

        return bool(query)


class ProductModel(db.Model):
    """
    Product Model Class
    """

    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    price = db.Column(db.String(120), nullable=True)
    image = db.Column(db.String(120), nullable=True)
    """
    Save user details in Database
    """
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    """
    Find user by username
    """
    @classmethod
    def find_by_title(cls, title):
        return cls.query.filter_by(title=title).first()
    """
    return all the user data in json form available in DB
    """
    @classmethod
    def return_all(cls, search):
        def to_json(x):
            return {
                'id': x.id,
                'title': x.title,
                'description': x.description,
                'price': x.price,
                'image': 'static/'+x.image
            }
        if search:
            return {'products': [to_json(product) for product in ProductModel.query.filter(ProductModel.title.like("%{}%".format(search))).all()]}
        else:
            return {'products': [to_json(product) for product in ProductModel.query.all()]}

    """
    Delete user data
    """
    @classmethod
    def delete(cls, id):
        try:
            ProductModel.query.filter_by(id=id).delete()
            db.session.commit()
            return {'message': f'{id} row(s) deleted'}

        except:

            return {'message': 'Something went wrong'}



class CommentModel(db.Model):
    """
    Product Model Class
    """

    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(120), nullable=False)
    item_id = db.Column(db.String(120), nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    """
    return all the user data in json form available in DB
    """
    @classmethod
    def return_all(cls, search):
        def to_json(x):
            return {
                'id': x.id,
                'comment': x.comment,
                'item_id': x.item_id
            }
        return {'products': [to_json(item) for item in CommentModel.query.all()]}

    @classmethod
    def filter_by_item_id(cls, item_id):
        def to_json(x):
            return {
                'id': x.id,
                'comment': x.comment,
                'item_id': x.item_id
                }
        return {'comments': [to_json(item) for item in CommentModel.query.filter_by(item_id=item_id).all()]}


    @classmethod
    def delete(cls, id):
        try:
            ProductModel.query.filter_by(id=id).delete()
            db.session.commit()
            return {'message': f'{id} row(s) deleted'}
        except:
            return {'message': 'Something went wrong'}


class RattingModel(db.Model):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.String(120), unique=True, nullable=False)
    item_id = db.Column(db.String(120), nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def filter_by_item_id(cls, item_id):
        def to_json(x):
            return {
                'id': x.id,
                'rating': x.rating,
                'item_id': x.item_id
                }
        return {'ratings': [to_json(item) for item in RattingModel.query.filter_by(item_id=item_id).all()]}

    @classmethod
    def return_all(cls, search):
        def to_json(x):
            return {
                'id': x.id,
                'rating': x.rating,
                'item_id': x.item_id
            }
        return {'products': [to_json(item) for item in CommentModel.query.all()]}

    """
    Delete user data
    """
    @classmethod
    def delete(cls, id):
        try:
            ProductModel.query.filter_by(id=id).delete()
            db.session.commit()
            return {'message': f'{id} row(s) deleted'}

        except:

            return {'message': 'Something went wrong'}
