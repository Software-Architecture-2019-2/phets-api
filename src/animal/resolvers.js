import { generalRequest } from "../utilities";
import { url, port } from "./server";

const URL = `http://${url}:${port}`;

const resolvers = {
    Query: {
        allAnimals: _ => generalRequest(`${URL}/animals`, "GET"),
        allAnimalTypes: _ => generalRequest(`${URL}/animal-types`, "GET"),
        animalById: (_, { id }) => generalRequest(`${URL}/animals/${id}`, "GET")
    },
    Mutation: {
        createAnimal: (_, { animal }) =>
            generalRequest(`${URL}/animals`, "POST", animal),
        updateAnimal: (_, { id, animal }) =>
            generalRequest(`${URL}/animals/${id}`, "PUT", animal),
        deleteAnimal: (_, { id }) =>
            generalRequest(`${URL}/animals/${id}`, "DELETE")
    }
};

export default resolvers;
