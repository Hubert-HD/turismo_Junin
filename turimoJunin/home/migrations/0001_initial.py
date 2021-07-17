# Generated by Django 3.2.4 on 2021-07-17 04:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('socialaccount', '0004_auto_20210707_1651'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('tipo', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Distrito',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Provincia',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Recurso',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('image_URL', models.URLField(blank=True)),
                ('subtitulo', models.CharField(max_length=255)),
                ('descripcion', models.TextField(blank=True, max_length=255, null=True)),
                ('categoria_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.categoria')),
                ('distrito_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.distrito')),
            ],
        ),
        migrations.CreateModel(
            name='Favorito',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('recurso_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.recurso')),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='socialaccount.socialaccount')),
            ],
        ),
        migrations.AddField(
            model_name='distrito',
            name='provincia_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.provincia'),
        ),
        migrations.CreateModel(
            name='Coordenadas',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('latitud', models.FloatField(blank=True, null=True)),
                ('longitud', models.FloatField(blank=True, null=True)),
                ('recurso_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='home.recurso')),
            ],
        ),
    ]
