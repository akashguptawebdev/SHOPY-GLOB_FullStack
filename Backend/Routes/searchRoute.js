import express from "express";
import { searchQuery } from "../Controllers/SearchControllers.js";

const searchRoute = express.Router();

searchRoute.get('/' , searchQuery)



export default searchRoute;