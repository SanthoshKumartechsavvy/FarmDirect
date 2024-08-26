from django.core.management.base import BaseCommand
from farmdirect.models import UserModel, UserProfile

class Command(BaseCommand):
    help = 'Create missing profiles for UserModel instances'

    def handle(self, *args, **kwargs):
        users_without_profiles = UserModel.objects.filter(profile__isnull=True)
        for user in users_without_profiles:
            UserProfile.objects.create(user=user, username=user.phone_number, role='farmer')
        self.stdout.write(self.style.SUCCESS('Successfully created missing profiles for users.'))