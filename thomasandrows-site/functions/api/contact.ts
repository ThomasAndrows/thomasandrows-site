import { handle, type Env } from '../_lib/send';
export const onRequestPost: PagesFunction<Env> = ({ request, env }) => handle(request, env, 'contact');
