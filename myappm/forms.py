from django import forms
from .models import MusicFile

class MusicFileForm(forms.ModelForm):
    class Meta:
        model = MusicFile
        fields = ['title', 'file']