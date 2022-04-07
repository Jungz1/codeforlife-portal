from django.template import loader
from django.http import Http404
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render


def index(request):
    template = loader.get_template('fypTools/index.html')
    return render(request, 'fypTools/index.html')