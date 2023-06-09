//RIZ: no need to import React since you're not using it.
import { useEffect, useState } from "react";
import TableHead from "./AlvinComponents/TableHead";
import TableRow from "./AlvinComponents/TableRow";

// Define the structure or shape of the user object

//RIZ: good definition of the type, but you never use it in your code? The errors in lines 54 onwards still exist.

//typically we use UpperCamelCase for types. So it should be "User".
export interface user {
  id: string;
  openId: string;
  displayName: string;
  accountType: string;
  accountTypes: {
    name: string;
  };
}

// with reference from: https://www.codingthesmartway.com/how-to-fetch-api-data-with-react/
const Alvin = () => {
  //correct use of useState. However, since this is typescript, you want to be explicit about what type of array data will contain. You will need to declare a new type called user.
  //Good job typing your data.
  const [data, setData] = useState<user[]>([]);

  //correct use of useEffect. This callback function will run once when the component is mounted, since the dependency array is empty.
  useEffect(() => {
    const fetchData = async () => {
      try {
        //correct use of the fetch API and async/await.
        const response = await fetch("/api/VA/alvin");
        const responseData = await response.json();

        //RIZ: what happens if you get an error from the server? Can you handle that case?
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    //good that you realised the useEffect callback function itself cannot be async. you need to declare the async function and call it within. Typically what we do (which you'll see if you look at our code, is to declare the function in another module and import it.)
    fetchData();
  }, []);

  return (
    // with reference from https://www.valentinog.com/blog/html-table/
    <table>
      {/* RIZ: additional task. can you make the <thead></thead> element into a new component called <TableHead />? */}
      <TableHead />
      <tbody>
        {/* good use of map to render the data. the reason you're getting the compilation errors is that data doesn't have its type declared. Try to get that done and you'll be good.  */}
        {data.map((user) => (
          // RIZ: additional task. Can you make the <tr></tr> element into a new component called <TableRow />? TableRow will also need to accept a userProp, passed to it by Alvin.tsx.
          <TableRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
};

export default Alvin;
