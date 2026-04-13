import { createFavourite, getFavouritesByUserId, deleteFavourite, deleteFavouriteById } from "../../repository/FavouriteRepository/favourite.repository";
 import { NextResponse } from "next/server";

const addFavourite = async (body) => {
    const { userId, newsId } = body;
    try {
        const favourite = await createFavourite(userId, newsId);
        return NextResponse.json(favourite, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

const removeFavourite = async (body) => {
    const { userId, newsId } = body;
    try {
        await deleteFavourite({userId, newsId});
        // return NextResponse.json({ message: "Favourite removed" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};


const removeFavouriteById = async (id) => {
    try { 

        await deleteFavouriteById(id);
        // return NextResponse.json({ message: "Favourite removed" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};



const getUserFavourites = async (params) => {
    const { id: userId } =  await params;
    // console.log("PARAMS:", params); //debugging line to check the structure of params
    // console.log("USER ID PARAM:", userId); // debugging line to check the extracted userId
    try {
        console.log("USER ID:", userId);
        const favourites = await getFavouritesByUserId(userId);
        console.log("TYPE:", typeof favourites);
        console.log("DATA:", favourites);
        return favourites;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }   
}
export { addFavourite, removeFavourite, getUserFavourites };    