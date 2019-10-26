import AnimalResolvers from "../animal/resolvers";
import EventResolvers from "../event/resolvers";

// Animal queries
const allAnimalsByUser = async (_, { username }) => {
  return (await AnimalResolvers.Query.allAnimals()).filter(
    animal => animal.user === username
  );
};

// Event queries
const allEventsByUser = async (_, { username }) => {
  let animalIds = (await allAnimalsByUser(_, {username})).map(animal => animal.id);
  const userEvents = (await EventResolvers.Query.allEvents()).list.filter(event =>
    animalIds.includes(parseInt(event.animal_id))
  );
  return userEvents;
};

const resolvers = {
  Query: {
    allAnimalsByUser,
    allEventsByUser,
  },
  Mutation: {}
};

export default resolvers;
