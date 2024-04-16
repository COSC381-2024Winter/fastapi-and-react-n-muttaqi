from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from movie import Movie


app = FastAPI()
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

movies = []
counter = 0
with open("./movies.txt", 'r', encoding="utf-8") as file:
    lines = file.readlines()
    for i, line in enumerate(lines):
        
        if i % 3 == 0:
            mov = Movie(
                id=counter,
                name=line.strip(),
                cast=lines[i+1].strip().split(", ")
            )
            movies.append(mov)
            counter += 1
            
    counter += 1

@app.get("/movies/{id}")
def get_movie(id: int):
    if id >= len(movies) or id < 0 or not movies[id]:
        return None
    mov = movies[id]
    return {
        "name": mov.name,
        "cast": mov.cast
    }

@app.put("/movies/{id}")
def put_movie(id: int, movie: Movie):
    if id >= len(movies) or id < 0 or not movies[id]:
        return None
    mov = movies[id]
    mov.name = movie.name
    mov.cast = movie.cast
    return get_movie(id)

@app.delete("/movies/{id}")
def delete_movie(id: int):
    if id >= len(movies) or id < 0 or not movies[id]:
        return None
    mov = get_movie(id)
    movies[id] = None
    return mov

@app.post("/movies/add")
def post_movie(movie: Movie):
    movies.append(movie)
    return len(movies)