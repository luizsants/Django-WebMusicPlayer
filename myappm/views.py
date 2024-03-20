from .forms import MusicFileForm
from django.shortcuts import render, redirect
from .models import MusicFile
from django.http import JsonResponse
from django.shortcuts import get_object_or_404


def home(request):
    music_files = MusicFile.objects.all()
    return render(request, 'home.html', {'music_files': music_files})

def music_management(request):
    if request.method == 'POST':
        form = MusicFileForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')  # Replace 'success_url' with your actual success URL
    else:
        form = MusicFileForm()
        
    return render(request, 'music_management.html', {'form': form})

def music_player(request):
    music_files = MusicFile.objects.all()
    return render(request, 'music_player.html', {'music_files': music_files})

def delete_music(request,):
    music_files = MusicFile.objects.all()
    return render(request, 'delete_music.html', {'music_files': music_files})

def delete_file(request, file_id):
    # Retrieve the music file from the database
    music_file = get_object_or_404(MusicFile, pk=file_id)

    # Delete the file from the filesystem
    music_file.file.delete(save=False)  # Assuming you have a FileField named 'file'

    # Delete the music file from the database
    music_file.delete()

    # Return a JSON response indicating success
    return JsonResponse({'message': 'File deleted successfully'})