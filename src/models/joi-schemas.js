import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const SpotSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Peak"),
    latitude: Joi.number().required().example("54.4791"),
    longitude: Joi.number().required().example("8.2779"),
    description: Joi.string().required().example("Very safe break"),
    difficultyid: IdSpec,
  })
  .label("Spot");

export const SpotSpecPlus = SpotSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("SpotPlus");

export const SpotArraySpec = Joi.array().items(SpotSpecPlus).label("SpotArray");

export const DifficultySpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Beginner"),
    userid: IdSpec,
    spots: SpotArraySpec,
  })
  .label("Difficulty");

export const DifficultySpecPlus = DifficultySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("DifficultyPlus");

export const DifficultyArraySpec = Joi.array().items(DifficultySpecPlus).label("DifficultyArray");

