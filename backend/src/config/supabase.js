// import { createClient } from "@supabase/supabase-js";
// import env from "./env.js";

// const supabaseClient = createClient(
//   env.supabase.url,
//   env.supabase.serviceRoleKey,
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//     },
//   }
// );

// export default supabaseClient;

import { createClient } from "@supabase/supabase-js";
import env from "./env.js";

const supabaseClient = createClient(
  env.supabase.url,
  env.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export default supabaseClient;