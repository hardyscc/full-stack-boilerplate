import { Heading, Button } from 'rebass';
import Layout from '../components/Layout';
import ButtonRed from '../components/ButtonRed';
import Container from '../components/Container';

export default () => (
  <Layout title="Register">
    <h1>Hello Register.js 👋</h1>
    <Container>
      <form>
        <Heading>Register</Heading>
        <input name="username" />
        <input type="password" name="password" />
        <Button variant="outline">Submit</Button>
        <ButtonRed>Cancel</ButtonRed>
      </form>
    </Container>
  </Layout>
);
