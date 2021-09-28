from django.contrib.auth.models import User
from common.models import Student

from common.helpers.generators import get_hashed_login_id


class StudentLoginBackend:
    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

    def authenticate(self, request, user_id=None, login_id=None):
        """Check the credentials and return a user."""
        print("*** authenticate ***")
        # Get the student by the user id
        user = self.get_user(user_id)
        if user:
            student = Student.objects.get(new_user=user)
            print("*** check stored hash ***")
            # Check the url against the student's stored hash then return the user.
            if student.login_id and get_hashed_login_id(login_id) == student.login_id:
                return user
        raise Exception("user does not exist")
        # return None
