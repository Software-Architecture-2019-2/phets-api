import AnimalResolvers from "../animal/resolvers";
import EventResolvers from "../event/resolvers";
import { paginate } from "../utilities";

// Animal queries
const allAnimalsByUser = async (_, { username }) => {
  return (await AnimalResolvers.Query.allAnimals()).filter(
    animal => animal.user === username
  );
};

const allAnimalsFilter = async (_, { filter }) => {
  let animals = (await AnimalResolvers.Query.allAnimals()).filter(animal => {
    let valid = true;
    if (valid && filter.animalType)
      valid &= animal.animal_type.id === filter.animalType;
    if (valid && filter.breed)
      valid &= new RegExp(`.*${filter.breed.toLowerCase()}.*`).test(
        animal.breed.toLowerCase()
      );
    if (valid && filter.adoption !== undefined) valid &= animal.adoption === filter.adoption;
    if (valid && filter.gender !== undefined) valid &= animal.gender === filter.gender;
    if (valid && filter.birthdate)
      valid &= new Date(animal.birthdate) >= new Date(filter.birthdate);
    if (valid && filter.notUser) valid &= animal.user !== filter.notUser;
    if (valid && filter.user) valid &= animal.user === filter.user;
    return valid;
  });
  return animals;
};

const allAnimalsPaged = async (_, { filter, pagination }) => {
  let animals = await allAnimalsFilter(_, { filter });
  const paginated = paginate(animals, pagination);
  return paginated;
};

// Event queries
const allEventsByUser = async (_, { username }) => {
  let animalIds = (await allAnimalsByUser(_, { username })).map(
    animal => animal.id
  );
  const userEvents = (await EventResolvers.Query.allEvents()).list.filter(
    event => animalIds.includes(parseInt(event.animal_id))
  );
  return userEvents;
};

const resolvers = {
  Query: {
    allAnimalsByUser,
    allAnimalsFilter,
    allAnimalsPaged,
    allEventsByUser
  },
  Mutation: {}
};

export default resolvers;
