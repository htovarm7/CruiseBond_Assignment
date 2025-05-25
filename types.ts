/*
* @file types.ts
* @author Hector
* @date 2025-5-25
* @brief This file contains the TypeScript interfaces for the cruise booking application.
*/

/*
Example JSON structure:
    "price": 319.0,
    "name": "7 Night Mediterranean - Western Cruise",
    "ship": {
        "name": "MSC Virtuosa",
        "rating": 4.5,
        "reviews": 123,
        "image": "https://res.cloudinary.com/cruisebound/image/upload/f_auto/v1656397931/production/small_msc_vi_item_76c6c4b53c.png",
        "line": {
            "logo": "https://res.cloudinary.com/cruisebound/image/upload/f_auto/v1649242239/production/line_logo_6_4bbd4246_eded_4690_bd5e_b184f4a64e82_0f9ac3171a.jpg",
            "name": "MSC Cruises"
        }
    },
    "itinerary": [
        "Naples, Italy",
        "Palma de Mallorca, Spain",
        "Barcelona, Spain",
        "Marseille, France",
        "Genoa, Italy",
        "La Spezia (Cinque Terre), Italy",
        "Naples, Italy"
    ],
    "region": "Caribbean",
    "departureDate": "2022-11-23",
    "returnDate": "2022-11-30",
    "duration": 7
*/

export interface Sailing {
    id: string;
    price: number;
    name: string;
    ship: {
        name: string;
        rating: number;
        reviews: number;
        image: string;
        line: {
        name: string;
        logo: string;
        };
    };
    itinerary: string[];
    region: string;
    departureDate: string;
    returnDate: string;
    duration: number;
}