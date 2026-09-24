import pandas as pd
import numpy  as np
from faker import Faker
from fastapi import HTTPException, status
import os 
import random

fake = Faker()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
STATIC_DIR = os.path.join(BASE_DIR, "static")

os.makedirs(STATIC_DIR, exist_ok=True)



def make_fake_data(n_datasets:int, list_of_data: list):
    try:
        fake_field = {
            'first_name': fake.first_name,
            'last_name': fake.last_name,
            'name': fake.name,
            'city': fake.city,
            'country': fake.country,
            'age': np.random.default_rng(),
            'contact': fake.phone_number,
            'email': fake.email,
            'job title': fake.job,
            'address': fake.address,
            'zip code': fake.zipcode,
            'Birth date':fake.date_of_birth,
            'past date':fake.past_date,
            'credit card number': fake.credit_card_number,
            'creidt card expire': fake.credit_card_expire,
            'username': fake.user_name,
            'domain':fake.domain_name,
            'ipv4': fake.ipv4,
            'ipv6': fake.ipv6,
            'public ipv4': fake.ipv4_public,
            'private ipv4': fake.ipv4_private,
            'text': fake.text,
            'word': fake.word,
            'paragraph': fake.paragraph,
            'sentence': fake.sentence,
            'color': fake.color,
            'rgb color': fake.rgb_color,
            'hsl color': fake.color_hsl,
            'hex color': fake.hex_color
        }
        if n_datasets is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Number of dataset is not provided.")
        if list_of_data is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty list of Data.")

        df = pd.DataFrame()
        for field in list_of_data:
            if field.lower() not in fake_field:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported field.")

            if field.lower() == 'age':
                df[field] = [fake_field[field].integers(low=15, high=70) for i in range(n_datasets)]
            else:
                df[field] = [fake_field[field]() for i in range(n_datasets)]
        random_state = random.randint(1, 200)
        filename = f'label_data_{random_state}.csv'
        file_path = os.path.join('static', filename)
        df.to_csv(file_path, index=False)
                
        head_data = df.head().to_dict(orient="records")
        return {
                    'filename': filename,
                    'head': head_data
                }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))





