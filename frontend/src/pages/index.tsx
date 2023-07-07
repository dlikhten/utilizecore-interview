import { Redirect } from 'components/Redirect';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export default function Home() {
  const currentEmail = useSelector((state: RootState) => state.login.currentEmail);

  if (currentEmail) {
    return <Redirect destination="/trips" />;
  } else {
    return <Redirect destination="/login" />;
  }
}
