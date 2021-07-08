from django.contrib import admin
from .models import Provincia, Distrito, Categoria, Recurso, Coordenadas

# Register your models here.
admin.site.register(Provincia)
admin.site.register(Distrito)
admin.site.register(Categoria)
admin.site.register(Recurso)
admin.site.register(Coordenadas)