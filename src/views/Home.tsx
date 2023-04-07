import CurrencyExchangeForm from "../components/CurrencyExchangeForm";
import classes from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <div className={classes["app-pg"]}>
      <h1>money exchange</h1>
      <CurrencyExchangeForm />
    </div>
  );
};

export default Home;
