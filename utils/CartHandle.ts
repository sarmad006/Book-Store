import { Books } from "../interfaces";
export const handleCartItems = (
  key: string,
  val: Books,
  tempMap: any,
  action
) => {
  let tempCart = new Map(tempMap);
  switch (action) {
    case "Add":
      if (tempCart.has(key)) {
        let value: any = tempCart.get(key);
        tempCart.set(key, {
          detail: val,
          quantity: value.quantity,
        });
      } else {
        tempCart.set(key, {
          detail: val,
          quantity: 1,
        });
      }
      break;

    case "DeleteOne":
      if (tempCart.has(key)) {
        let value: any = tempCart.get(key);
        if (value.quantity > 1) {
          tempCart.set(key, {
            detail: val,
            quantity: value.quantity - 1,
          });
        } else {
          tempCart.delete(key);
        }
      }
      break;

    case "DeleteMany":
      tempCart.delete(key);
  }

  return tempCart;
};
