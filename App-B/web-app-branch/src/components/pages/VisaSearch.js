import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VisaContext } from "../visa/VisaContext";
import {
  PageContainer,
  Header,
  MainContent,
  SearchContainer,
  SearchHeader,
  SearchForm,
  InputGroup,
  Input,
  Button,
} from "../styled/VisaSearchStyles";

const VisaSearch = () => {
  const navigate = useNavigate();
  const { fetchVisaSuggestions } = useContext(VisaContext);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchVisaSuggestions();
    navigate("/suggested-results");
  };

  return (
    <PageContainer>
      <Header>Welcome to AFS</Header>
      <MainContent>
        <SearchContainer>
          <SearchHeader>
            Find the visa that's right for you and apply today!
          </SearchHeader>
          <SearchForm onSubmit={handleSearchSubmit}>
            <InputGroup>
              <Input placeholder="My nationality is.." />
              <Input placeholder="I'm traveling to.." />
            </InputGroup>
            <InputGroup>
              <Input type="radio" name="travelPurpose" id="tourism" />
              <label htmlFor="tourism">Tourism</label>
              <Input type="radio" name="travelPurpose" id="business" />
              <label htmlFor="business">Business</label>
            </InputGroup>
            <InputGroup>
              <Input type="date" placeholder="Date of intended travel" />
            </InputGroup>
            <Button type="submit">Let's gooo!</Button>
          </SearchForm>
        </SearchContainer>
      </MainContent>
    </PageContainer>
  );
};

export default VisaSearch;
