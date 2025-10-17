import { createClient } from '@supabase/supabase-js';
import { appConfig } from '../../config/app.config';

export const supabase = createClient(appConfig.supabaseUrl, appConfig.supabaseAnonKey);