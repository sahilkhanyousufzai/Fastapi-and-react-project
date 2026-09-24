from fastapi import HTTPException, status
from sklearn.datasets import make_blobs, make_regression, make_classification
import pandas as pd
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
STATIC_DIR = os.path.join(BASE_DIR, "static")

os.makedirs(STATIC_DIR, exist_ok=True)


# create the dataset for the cluserting and
def create_cluster_data(n_sample:int,n_feature: int,centers: int, std: float, random_state:int):
    try:
        if n_sample is None or n_sample <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value Sample')

        if n_feature is None or n_feature <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value of Features')
        if centers is None or centers <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in center value.')
        if std is None or not (0.0 <= std <= 1.0):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value of Std.')

        if random_state is None or random_state < 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value of random_state')
        
        X, y = make_blobs(n_samples=n_sample, n_features=n_feature,centers=centers, cluster_std=std, random_state=random_state)
        df = pd.DataFrame()
        for i in range(X.shape[1]):
            df['feature_'+ str(i+1)] = X[:, i]

        filename = f'cluster_{random_state}.csv'
        file_path = os.path.join('static', filename)
        df.to_csv(file_path, index=False)

        head_data = df.head().to_dict(orient="records")
        return {
            'filename': filename,
            'head': head_data
        }

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


# Function for making the data for the regression
def create_regression_data(n_sample: int, n_feature: int, noise:int, random_state:int):
    try:
        if n_sample is None or n_sample <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value Sample')

        if n_feature is None or n_feature <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value of Feature')

        if random_state is None or random_state < 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value of Random State')

        if noise is None or noise < 0.0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value of Noise')

        X, y = make_regression(n_samples=n_sample, n_features=n_feature, noise=noise, random_state=random_state)

        df = pd.DataFrame()
        for i in range(X.shape[1]):
            df['Feature_' + str(i+1)] = X[:, i]

        df['target'] = y
        filename = f'regression_{random_state}.csv'
        file_path = os.path.join('static', filename)
        df.to_csv(file_path, index=False)
        
        head_data = df.head().to_dict(orient="records")
        return {
                    'filename': filename,
                    'head': head_data
                }
        
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


# fucntion for creating the dataset for the classification
def create_classification_data(n_sample: int, n_feature: int, n_redundant:int, random_state:int, n_classes:int):
    try:
        if n_sample is None or n_sample <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value Sample')

        if n_feature is None or n_feature <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value of Feature')

        if random_state is None or random_state < 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value of Random State')

        if n_redundant is None or n_redundant < 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value of redundant')

        if n_classes is None or n_classes <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Error in value of class')

                
        X, y = make_classification(n_samples=n_sample, n_features=n_feature, n_classes=n_classes, random_state=random_state, n_redundant=n_redundant)

        df = pd.DataFrame()
        for i in range(X.shape[1]):
            df['Feature_' + str(i+1)] = X[:, i]

        df['target'] = y
        filename = f'classifiction_{random_state}.csv'
        file_path = os.path.join('static', filename)
        df.to_csv(file_path, index=False)
        
        head_data = df.head().to_dict(orient="records")
        return {
                    'filename': filename,
                    'head': head_data
                }

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

