import React from 'react';
import { render, fireEvent, waitFor,getByTestId,screen  } from '@testing-library/react';
import JobSection from '../Components/JobSection/JobSection2';



describe('JobSection component', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve([{ id: 1, company_name: 'Test Company' }])
      });
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('renders correctly', async () => {
      const {  getByText, getByPlaceholderText } = render(<JobSection />);
      
      // Check if the main heading and search input are rendered
      expect(getByText('All Jobs')).toBeTruthy();
      expect(getByPlaceholderText('Search jobs...')).toBeTruthy();
  
      // Wait for fetch to complete
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  
      // Check if the job card is rendered
      expect(getByText('Explore thousands of job opportunities with all the information you need. Its your future')).toBeTruthy();
    });
  
    
  });