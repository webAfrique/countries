import { createSlice } from "@reduxjs/toolkit";
import { auth, addFavouriteToDb, removeFavouriteFromDb, clearFavouritesFromDb } from "../auth/firebase";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    getFavourites(state, action) {
      state.favourites = action.payload;
    },
    addFavourite(state, action) {
      //if the country is already in the user's favourites, do not add it again
      if(state.favourites.find((country) => country.name.common === action.payload.name.common)) state.favourites = [...state.favourites]
      //if the country is not in the user's favourites, add it
      state.favourites = [...state.favourites, action.payload];

      const user = auth.currentUser;
      if (user) addFavouriteToDb(user.uid, action.payload);
    },
    //remove a country from the user's favourites
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter((country) => country.name.common !== action.payload.name.common);

      const user = auth.currentUser;
    if (user) {
       removeFavouriteFromDb(user.uid, action.payload);
    }
    },
    clearFavourites(state) {
      state.favourites = [];
      const user = auth.currentUser;
      if (user) {
        clearFavouritesFromDb(user.uid);
      }
    },
  },
});

export const { getFavourites, addFavourite, removeFavourite, clearFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;


// removeFavourite(state, action) {
//   const newArray = [...state.favourites];
//   newArray.splice(
//     newArray.findIndex((e) => e === action.payload),
//     1
//   );
//   state.favourites = [...newArray];

//   // const user = auth.currentUser;
//   // if (user) {
//   //   removeFavouriteFromDb(user.uid, action.payload);
//   // }
// },