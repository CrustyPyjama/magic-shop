
import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const getImageUrl = (code) => {
  const baseCode = code.replace(/[^A-Z0-9]/gi, '').toUpperCase();
  const set = baseCode.slice(0, 3);
  const id = baseCode.match(/[A-Z]{3}(\d{1,4})/)[1];
  return `https://www.mtgpics.com/pics/big/${set}${id}.jpg`;
};

const initialCards = [
  { code: "TDM317NM", price: 5.00, margin: -0.1, quantity: 3 },
  { code: "TDM317FNM", price: 8.00, margin: 0.0, quantity: 1 },
  { code: "TDM317PFNM", price: 15.00, margin: 0.2, quantity: 0 }
];

export default function App() {
  const [cards] = useState(initialCards);

  const parseCode = (code) => {
    const upper = code.toUpperCase();
    return {
      set: upper.slice(0, 3),
      id: upper.match(/[A-Z]{3}(\d{1,4})/)[1],
      foil: upper.includes("F") && !upper.includes("PF"),
      promo: upper.includes("P"),
      condition: upper.match(/(NM|SP|MP|HP|D)$/)?.[0] || ""
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Turlupin Maître Farceur</h1>
        <p className="text-lg text-gray-300">Vente de cartes Magic à prix malicieux !</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const { set, id, foil, promo, condition } = parseCode(card.code);
          const imageUrl = getImageUrl(card.code);
          const finalPrice = (card.price * (1 + card.margin)).toFixed(2);

          return (
            <Card key={card.code} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <img
                  src={imageUrl}
                  alt={card.code}
                  className="rounded-xl mb-4 w-full h-auto"
                />
                <h2 className="text-xl font-semibold mb-1">Code : {card.code}</h2>
                <p className="text-sm text-gray-400 mb-1">Set : {set} | ID : {id}</p>
                <p className="text-sm text-gray-400 mb-1">
                  {promo && "Promo "}
                  {foil && "Foil "}
                  {condition && `| État : ${condition}`}
                </p>
                <p className="mb-2">Prix : {finalPrice} €</p>
                <p className="mb-4">Stock : {card.quantity > 0 ? card.quantity : "Indisponible"}</p>
                <Button className="w-full" disabled={card.quantity === 0}>
                  {card.quantity > 0 ? "Ajouter au panier" : "Rupture de stock"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
