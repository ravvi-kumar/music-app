import { Dispatch, SetStateAction } from "react";
import { FaMusic } from "react-icons/fa";

type Props = {
  libraryStatus: boolean;
  setLibraryStatus: Dispatch<SetStateAction<boolean>>;
};

function Nav({ libraryStatus, setLibraryStatus }: Props) {
  return (
    <nav>
      <h1>Waves</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FaMusic size={"10px"} />
      </button>
    </nav>
  );
}

export default Nav;
