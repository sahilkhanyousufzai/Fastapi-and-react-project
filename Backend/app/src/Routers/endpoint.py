from fastapi import APIRouter, HTTPException, status, Request, Depends
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from Services.fake_ml_data import create_classification_data, create_regression_data, create_cluster_data
from Services.fake_data import make_fake_data

router = APIRouter(
    prefix='/generate_datasets',
    tags=['generate_datasets']
)


# Pydantic data for the clustering data
class ClusterData(BaseModel):
    sample: int = Field(gt=0)
    feature: int = Field(gt=0)
    centers: int = Field(gt=0)
    std: float = Field(ge=0.0, le=1.0)
    random_state: int = Field(gt=0)



# Pydantic data for the Regression data
class RegressionData(BaseModel):
    sample: int = Field(gt=0)
    feature: int = Field(gt=0)
    noise: int = Field(gt=0)
    random_state: int = Field(gt=0)


class ClassificationData(BaseModel):
    sample: int = Field(gt=0)
    feature: int = Field(gt=0)
    redundant: int = Field(gt=0)
    random_state: int = Field(gt=0)
    classes: int = Field(gt=0) 

class FakeData(BaseModel):
    n_dataset: int = Field(gt=0)
    list_of_data: list[str] = Field(min_length=1)


@router.get("/hello")
def hello():
    return {"message": "hello_world"}

@router.post('/cluster_data', status_code=status.HTTP_200_OK)
def cluster_data_endpoint(request: Request,data:ClusterData):
    try:
        result = create_cluster_data(data.sample,data.feature, data.centers, data.std, data.random_state)
        base_url = str(request.base_url) # Handles local or production domains automatically
        download_link = f"{base_url}static/{result['filename']}"
    
        # 4. Return the final structured response
        return {
        "message": "Dataset generated successfully!",
        "download_url": download_link,
        "sample_data": result["head"]
        }
    
    except Exception as e:
        raise e


@router.post('/regression_data', status_code=status.HTTP_200_OK)
def regression_data_endpoint(request: Request,data:RegressionData):
    try:
        result = create_regression_data(data.sample, data.feature, data.noise, data.random_state)
        base_url = str(request.base_url) # Handles local or production domains automatically
        download_link = f"{base_url}static/{result['filename']}"
    
        # 4. Return the final structured response
        return {
        "message": "Dataset generated successfully!",
        "download_url": download_link,
        "sample_data": result["head"]
        }
    
    except Exception as e:
        raise e

@router.post('/classification_data', status_code=status.HTTP_200_OK)
def classification_data_endpoint(request: Request,data:ClassificationData):
    try:
        result = create_classification_data(data.sample, data.feature, data.redundant, data.random_state, data.classes)
        base_url = str(request.base_url) # Handles local or production domains automatically
        download_link = f"{base_url}static/{result['filename']}"
    
        # 4. Return the final structured response
        return {
        "message": "Dataset generated successfully!",
        "download_url": download_link,
        "sample_data": result["head"]
        }
    
    except Exception as e:
        raise e

@router.post("/fake_data", status_code=status.HTTP_200_OK)
def fake_data_endpoint(request: Request, data: FakeData):
    try:
        result = make_fake_data(data.n_dataset, data.list_of_data)
        base_url = str(request.base_url) # Handles local or production domains automatically
        download_link = f"{base_url}static/{result['filename']}"

        return {
                "message": "Dataset generated successfully!",
                "download_url": download_link,
                "sample_data": result["head"]
                }

    except Exception as e:
        raise e
            