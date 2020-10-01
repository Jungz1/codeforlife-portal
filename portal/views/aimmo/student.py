from common.models import ContentPage
from django.http import request
from django.views.generic.base import View
from django.shortcuts import render


class AimmoStoryPageView(View):
    def get(self, request, *args, **kwargs):
        page: ContentPage = ContentPage.objects.all().first()
        print(page)
        return render(request, "portal/aimmo/story.html", {"page": page})
