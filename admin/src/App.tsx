import {
  Admin,
  Resource,
  fetchUtils,
  bwLightTheme,
  bwDarkTheme,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import postgrestRestProvider, {
  type IDataProviderConfig,
  defaultPrimaryKeys,
  defaultSchema,
} from "@raphiniert/ra-data-postgrest";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const headers = new Headers(options.headers || {});
  headers.set("apikey", SUPABASE_KEY);
  headers.set("Authorization", `Bearer ${SUPABASE_KEY}`);
  return fetchUtils.fetchJson(url, { ...options, headers });
};

const config: IDataProviderConfig = {
  apiUrl: SUPABASE_URL,
  httpClient,
  defaultListOp: "eq",
  primaryKeys: defaultPrimaryKeys,
  schema: defaultSchema,
};

const dataProvider = postgrestRestProvider(config);

const App = () => (
  <Admin dataProvider={dataProvider} theme={bwLightTheme} darkTheme={bwDarkTheme}>
    <Resource name="users" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    <Resource name="orders" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
  </Admin>
);

export default App;
