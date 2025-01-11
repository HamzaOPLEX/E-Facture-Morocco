from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime
from django.core.cache import cache

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)


class Product(models.Model):
    product_name = models.CharField(max_length=255,unique=True,blank=False)
    product_price = models.FloatField(blank=False,default=0)

    def ___str__(self):
        return self.product_name

class Client(models.Model):
    client_name = models.CharField(max_length=255,unique=True,blank=False)
    client_ICE = models.CharField(max_length=255,unique=True,blank=False)
    client_city = models.CharField(max_length=255,blank=False)

    def __str__(self):
        return self.client_name

class Document(models.Model):
    DOCUMENT_TYPES = [
        ('invoices', 'INVOICE'),
        ('devis', 'DEVIS'),
        ('bl', 'BL'),
    ]

    TTC_OR_HT_CHOICES = [
        ('TTC', 'TTC'),
        ('HT', 'HT'),
    ]

    DOCUMENT_STATUS_CHOICES = [
        ('Unpaid', 'UNPAID'),
        ('Paid', 'PAID'),
    ]

    DOCUMENT_PAIMENT_METHOD_CHOICES = [
        ('Cash', 'CASH'),
        ('Cheque', 'CHEQUE'),
        ('Letter', 'LETTER'),
        ('Bank_Transfer', 'BANK_TRANSFER'),
    ]

    document_number = models.CharField(max_length=255, unique=True,default='')
    document_client = models.ForeignKey(Client, on_delete=models.RESTRICT)
    document_date = models.DateField()
    ttc_or_ht = models.CharField(max_length=255, default='NONE', choices=TTC_OR_HT_CHOICES)
    document_status = models.CharField(max_length=10, default='UNPAID', choices=DOCUMENT_STATUS_CHOICES)
    deposit = models.FloatField(default=0)
    document_payment_method = models.CharField(max_length=255,default='NONE',choices=DOCUMENT_PAIMENT_METHOD_CHOICES)  # You may want to add choices here as well
    document_type = models.CharField(max_length=10, default='INVOICE', choices=DOCUMENT_TYPES)
    document_created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, editable=False)
    document_items = models.JSONField(null=False, blank=False)

    def __str__(self):
        return f"{self.document_number} for {self.document_client}"

    def save(self, *args, **kwargs):
        cache.delete('all_posts')
        super().save(*args, **kwargs)

@receiver(post_save, sender=Document)
def set_document_number(sender, instance, **kwargs):
    template = {'invoices':"FA",'bl':"BL","devis":"DV"}
    if not instance.document_number:
        current_year = datetime.now().year
        new_id = Document.objects.filter(document_type=instance.document_type).count()
        instance.document_number = f'{template[instance.document_type]}-{new_id}/{current_year}'
        instance.save()