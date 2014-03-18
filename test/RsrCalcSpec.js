
describe("RsrCalc", function() {

  describe("project dependencies", function() {

    it("should work with Jasmine", function() {
      expect(true).toBe(true);
    })

    it("should work with the calculateScore", function() {

        var offender_data = {offender_title_options:["Please select", "Mr", "Mrs", "Miss", "Ms", "Dr", "Other", "None"],
        offender_sex_options:["Please select\u2026", "Male", "Female"],
        birth_date_options:["Day", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        birth_month_options:["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        birth_year_options:["Year", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981", "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971", "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963", "1962", "1961", "1960", "1959", "1958", "1957", "1956", "1955", "1954", "1953", "1952", "1951", "1950", "1949", "1948", "1947", "1946", "1945", "1944", "1943", "1942", "1941", "1940", "1939", "1938", "1937", "1936", "1935", "1934", "1933", "1932", "1931", "1930", "1929", "1928", "1927", "1926", "1925", "1924", "1923", "1922", "1921", "1920", "1919", "1918", "1917", "1916", "1915", "1914", "1913", "1912", "1911", "1910", "1909", "1908", "1907", "1906", "1905", "1904", "1903", "1902", "1901", "1900"],
        assessment_date_options:["Day", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        assessment_month_options:["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        assessment_year_options:["Year", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981", "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971", "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963", "1962", "1961", "1960", "1959", "1958", "1957", "1956", "1955", "1954", "1953", "1952", "1951", "1950", "1949", "1948", "1947", "1946", "1945", "1944", "1943", "1942", "1941", "1940", "1939", "1938", "1937", "1936", "1935", "1934", "1933", "1932", "1931", "1930", "1929", "1928", "1927", "1926", "1925", "1924", "1923", "1922", "1921", "1920", "1919", "1918", "1917", "1916", "1915", "1914", "1913", "1912", "1911", "1910", "1909", "1908", "1907", "1906", "1905", "1904", "1903", "1902", "1901", "1900"],
        offence_type_options:["Please select\u2026", "Absconding/ bail", "Acquisitive violence", "Burglary (domestic)", "Burglary (other)", "Criminal damage", "Drink driving", "Drug import/ export/ production", "Drug possession/ supply", "Drunkenness", "Fraud, forgery & misrepresentation", "Handling stolen goods", "Motoring (not drink driving)", "Other offence", "Public order, harassment", "Sexual (against children)", "Sexual (not against children)", "Theft (not vehicle-related)", "Vehicle-related theft", "Violence against the person", "Welfare fraud"],
        conviction_date_options:["Day", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        conviction_month_options:["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        conviction_year_options:["Year", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981", "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971", "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963", "1962", "1961", "1960", "1959", "1958", "1957", "1956", "1955", "1954", "1953", "1952", "1951", "1950", "1949", "1948", "1947", "1946", "1945", "1944", "1943", "1942", "1941", "1940", "1939", "1938", "1937", "1936", "1935", "1934", "1933", "1932", "1931", "1930", "1929", "1928", "1927", "1926", "1925", "1924", "1923", "1922", "1921", "1920", "1919", "1918", "1917", "1916", "1915", "1914", "1913", "1912", "1911", "1910", "1909", "1908", "1907", "1906", "1905", "1904", "1903", "1902", "1901", "1900"],
        sentence_date_options:["Day", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        sentence_month_options:["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        sentence_year_options:["Year", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981", "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971", "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963", "1962", "1961", "1960", "1959", "1958", "1957", "1956", "1955", "1954", "1953", "1952", "1951", "1950", "1949", "1948", "1947", "1946", "1945", "1944", "1943", "1942", "1941", "1940", "1939", "1938", "1937", "1936", "1935", "1934", "1933", "1932", "1931", "1930", "1929", "1928", "1927", "1926", "1925", "1924", "1923", "1922", "1921", "1920", "1919", "1918", "1917", "1916", "1915", "1914", "1913", "1912", "1911", "1910", "1909", "1908", "1907", "1906", "1905", "1904", "1903", "1902", "1901", "1900"],
        sexual_element_options:["Please select\u2026", "Yes", "No"],
        stranger_victim_options:["Please select\u2026", "Yes", "No"],
        violent_offence_category_options:["Please select\u2026", "Summary VATP", "Actual/ threatened use of firearms", "Possession/ supply of firearms", "Other statutory weapon offences", "Other indictable VATP"],
        sanction_date_options:["Day", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        sanction_month_options:["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        sanction_year_options:["Year", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981", "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971", "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963", "1962", "1961", "1960", "1959", "1958", "1957", "1956", "1955", "1954", "1953", "1952", "1951", "1950", "1949", "1948", "1947", "1946", "1945", "1944", "1943", "1942", "1941", "1940", "1939", "1938", "1937", "1936", "1935", "1934", "1933", "1932", "1931", "1930", "1929", "1928", "1927", "1926", "1925", "1924", "1923", "1922", "1921", "1920", "1919", "1918", "1917", "1916", "1915", "1914", "1913", "1912", "1911", "1910", "1909", "1908", "1907", "1906", "1905", "1904", "1903", "1902", "1901", "1900"],
        sexual_offence_history_options:["Please select\u2026", "Yes", "No"],
        most_recent_sexual_offence_date_options:["Day", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        most_recent_sexual_offence_month_options:["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        most_recent_sexual_offence_year_options:["Year", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981", "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971", "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963", "1962", "1961", "1960", "1959", "1958", "1957", "1956", "1955", "1954", "1953", "1952", "1951", "1950", "1949", "1948", "1947", "1946", "1945", "1944", "1943", "1942", "1941", "1940", "1939", "1938", "1937", "1936", "1935", "1934", "1933", "1932", "1931", "1930", "1929", "1928", "1927", "1926", "1925", "1924", "1923", "1922", "1921", "1920", "1919", "1918", "1917", "1916", "1915", "1914", "1913", "1912", "1911", "1910", "1909", "1908", "1907", "1906", "1905", "1904", "1903", "1902", "1901", "1900"],
        oasys_interview_options:["Please select\u2026", "Yes", "No"],
        murder_options:["Please select\u2026", "Yes", "No"],
        wounding_options:["Please select\u2026", "Yes", "No"],
        burglary_options:["Please select\u2026", "Yes", "No"],
        arson_options:["Please select\u2026", "Yes", "No"],
        endager_life_options:["Please select\u2026", "Yes", "No"],
        kidnapping_options:["Please select\u2026", "Yes", "No"],
        firearm_possession_options:["Please select\u2026", "Yes", "No"],
        robbery_options:["Please select\u2026", "Yes", "No"],
        any_other_offence_options:["Please select\u2026", "Yes", "No"],
        use_weapon_options:["Please select\u2026", "Yes", "No"],
        partner_options:["Please select\u2026", "Yes", "No"],
        accommodation_options:["Please select\u2026", "0", "1", "2"],
        employment_options:["Please select\u2026", "Yes", "No"],
        relationship_options:["Please select\u2026", "0", "1", "2"],
        domestic_violence_options:["Please select\u2026", "Yes", "No"],
        current_use_of_alcohol_options:["Please select\u2026", "0", "1", "2"],
        binge_drinking_options:["Please select\u2026", "0", "1", "2"],
        impulsivity_options:["Please select\u2026", "0", "1", "2"],
        temper_options:["Please select\u2026", "0", "1", "2"],
        pro_criminal_options:["Please select\u2026", "0", "1", "2"],
        birthDate:(new Date(283996800000)),
        assessmentDate:(new Date(1394668800000)),
        offenderTitle:"Mr", firstName:"First", familyName:"Family", sex:"0", age:35, pncId:"pnc", deliusId:"delius",
        convictionDate:(new Date(1325376000000)), sentenceDate:(new Date(1356998400000)),
        currentOffenceType:"5", sexualElement:"1", strangerVictim:"", violentOffenceCategory:"",
        firstSanctionDate:(new Date(1009843200000)), allSanctions:3, violentSanctions:1, sexualOffenceHistory:"1",
        mostRecentSexualOffence:(new Date(-2211753600000)), contactAdult:0, contactChild:0,
        indecentImage:0, paraphilia:0, oasysInterview:1, useWeapon:"", partner:"", accommodation:"",
        employment:"", relationship:"", currentUseOfAlcohol:"", bingeDrinking:"", impulsivity:"",
        temper:"", proCriminal:"", domesticViolence:"", murder:"", wounding:"", kidnapping:"",
        firearmPossession:"", robbery:"", burglary:"", anyOtherOffence:"", endagerLife:"", arson:""}

        // Correct computed value should be in the property named 'correct_result'
        offender_data.correct_result = 0.003367680057082034

        var result = moj.Modules.RSRCalc.calculateScore(offender_data);
        expect(result).toBe(offender_data.correct_result );
    });

    it("should load fixtures", function() {
        jasmine.getFixtures().fixturesPath = "base/data/"
        var f = readFixtures("data.json");
        var json = JSON.parse(f);

        expect(json).not.toBeNull();
    })

  })

})
