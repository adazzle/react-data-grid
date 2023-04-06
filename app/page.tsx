import { redirect } from 'next/navigation';

export default function Profile() {
  // TODO: is this the best way to set default page?
  redirect('/common-features');
}
