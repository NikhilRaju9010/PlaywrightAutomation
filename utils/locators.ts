export const locators = {

    pageURL: {
        startcouncil:"https://startcouncil.org/join?target=11160",
        dna: "",
        next47: "",
    
    },
    loginPage: {
        firstName: "//input[@name='user[first_name]']",
        applyButton: "(//span[contains(text(),'Apply')])[1]",
        lastName: "//input[@name='user[last_name]']",
        userEmail : "//input[@name='user[email]' and @id='top_email']",
        userPassword : "//input[@name='user[password]' and @id='top_password']",
        ideaState : "//select[@id='top_idea_state_cd']",
        applyToCohort : "(//div[contains(text(),'or Apply with')]/preceding::input)[13]",
    },
    applicationQuestions: {
        highest_level_of_education: "//select[@id='user_education_cd']",
        years_of_professional_experience: "//select[@id='user_professional_experience_cd']",
        years_of_startUp_experience: "//select[@id='user_start_up_experience_cd']",
        years_of_experience_on_idea: "//select[@id='user_idea_field_experience_cd']",
        working_hours_per_week_on_idea:"//select[@id='user_working_hrs_on_idea_cd']",
        team_size:"//select[@id='user_team_size_cd']",
        working_together:"//select[@id='user_team_working_hrs']",
        technical_experience_team:"//select[@id='user_team_tech_experience']",
        team_members_with_business_experience:"//select[@id='user_team_business_experience']",
        business_already_incorporated:"//select[@id='user_business_incorporated']",
        primary_skill_set:"//select[@id='user_primary_skill_cd']",
        Describe_your_startup:"//textarea[@id='user_field_2']",
        AboutMyStartup:"Write 1-­2 paragraphs describing your startup idea",
        Sustainable_Development_Goal:"//select[@name='user[idea_align]']",
        positive_impact_on_idea:"//textarea[@name='user[idea_and_positive_impact]']",
        positiveImpact:"Write 1-­2 paragraphs describing your startup idea",
        primary_industry:"//select[@name='user[primary_industry]']",
        secondary_industry:"//select[@name='user[secondary_industry]']",
        primary_help:"//select[@name='user[primary_help]']",
        secondary_help:"//select[@name='user[secondary_help]']",
        continue_button:"//button[contains(text(),'Continue')]"
    },
    personalInformation: {
        gender:"//select[@id='user_gender']",
        phone_Number: "//input[@id='user_phone_number_tmp']",
        phoneNumber: "2015551234",
        LinkedIn: "//input[@id='user_linkedin_website']",
        linkedinURL:"https://linked.com",
        city:"//input[@id='location_city']",
        cityName:"Bali",
        Country_of_residence:"//input[@id='location_country']",
        residenceName:"Indonesia",
        Country_of_Origin:"(//span[@class='selection'])[2]",
        countrySearch:"//input[@class='select2-search__field']",
        countreySelect:"Algeria",
        Company_Name:"//input[@id='company_name']",
        nameOfCompany:"Automation",
        how_you_heard_about:"//select[@id='user_source_3']",
        how_you_heard_about_more:"//input[@id='user_source_1']",
        how_you_heard_Text:"Groups",
        submit_application_button: "//button[contains(text(),'Submit Application')]",
    },
    dnaTest:{
        startAssessment:"//a[contains(text(),'Start the Assessment')]",
        getStarted:"//a[contains(text(),'Get Started')]",
        questionButton: (questionNumber: number , buttonIndex: number) =>  
      `(//div[contains(text(),'question ${questionNumber}')]/following::button)[${buttonIndex}]`,
        imageQuestionButton :(imageQuestionNumber: number) => 
            `(//div[contains(text(),'question ${imageQuestionNumber}')]/following::div)[24]`,
        fullTest:"//button[contains(text(),'Start the full test')]",
        testContinue:"//button[contains(text(),'Continue')]",
        imageAnswer:"//div[@data-answer='3']",
        submitTest:"//button[contains(text(),'Submit and view report')]",
        nextStep:"//h4[contains(text(),'See Next Steps')]",
    },
    testedUser:{
        userApplicationName:"//div[contains(text(),'Your Application to')]/preceding-sibling::div",
        applicationTextName:"//div[contains(text(),'Your Application to')]",
    },
    logout:{
        logoutIcon:"//i[@class='fi-icon-user']",
        logoutButton:"//div[contains(text(),'Logout')]",
    },
    login:{
        signInButton:"//span[contains(text(),'Sign in')]",
        userEmailFeild:"//input[@name='user[email]' and @id='#form_email_address']",
        adminEmail:"bv@fi.co",
        userPasswordFeild:"//input[@name='user[password]' and @placeholder='Password']",
        adminPassword:"qwerty@fiqa",
        loginButton:"//span[contains(text(),'Login')]",
    },
    enrollmentmetaPage:{
        enrollmentmetaPageURL:"https://startcouncil.org/admin/enrollmentmeta",
        enrollmentmetaIframe:"//iframe[@id='embedded_iframe']",
        enrollmentmetaSearchField:"//input[@id='user_name']",
        enrollmentmetaSearchbutton:"//input[@value='Search']",
        statusDropDown:"(//div[@id='search']/child::form/child::div/child::select)[1]",
        statusUpdateDropDown:"//div[@id='search']/child::form/child::div/child::select/following-sibling::input",
    },
    acceptedUser:{
        signAgreementButton:"//a[contains(text(),'Sign the Entrance Agreement')]",
        optEsignButton:"(//div[contains(text(),'Review and Sign')]/following-sibling::div/following::button)[1]",
        chooseFileButton:"(//div[contains(text(),'Upload the signed')]/following::input)[1]",
        saveFileButton:"(//div[contains(text(),'Upload the signed')]/following::input)[2]",
        payEntranceFeeButton:"//button[contains(text(),'Pay the Entrance Fee')]",
        payWithCard:"//button[contains(text(),'Pay with Card')]",
        cardNumber:"(//span[@class='InputContainer'])[1]",
        mmAndyy:"(//span[@class='InputContainer'])[2]",
        cvc:"(//span[@class='InputContainer'])[3]",
        cardHolderName:"//input[@id='billingName']",
        cardHolderNameText:"dummy",
    },
    confirmedFounder:{
        navbarHomeButton:"(//div[@id='collapse_operating']/child::a)[1]",
        welcomeMessage:"(//h3)[1]",
        founderLogout:"//span[contains(text(),'Log out')]",
        navbarAllSprintsButton:"(//a[text()='All Sprints'])[1]",
        sessiosnViewSprintButton:(sessionName: string) =>
            `(//h2[text()='${sessionName}']/following::span[text()='View sprint'])[1]`,
        sessionEditAllButton:"//span[text()='Edit all']",
        deliverablesInputFeild:"//trix-editor[@data-auto-save-target='editor']",
        deliverablesUpdateButton:"(//trix-editor/following::span)[1]",
        deliverablesWelcomeButton:"//button[text()='Okay!']",
        resourcesButton:"//button[@x-show='showCommonResource']",

    },
    adminSemesterPage:{
        adminSemesterPageURL:"https://startcouncil.org/admin/semester/11160",
        acceleratorKickoffSession:"(//span[contains(text(),'Accelerator Kickoff')]/following::i)[1]",
        monthDropDown:"(//div[contains(text(),'Accelerator Kickoff')]/following::select[@class='flatpickr-monthDropdown-months'])[1]",
        dateSelect: (newDate : string) =>  
            `(//div[contains(text(),'Accelerator Kickoff')]/following::span[contains(text(),'${newDate}')])[1]`,
        sessionDateSelect: (sessionName: string ,newDate : string) =>  
            `(//div[contains(text(),'${sessionName}')]/following::span[contains(text(),'${newDate}')])[1]`,
        sessionDateIcon:(sessionName: string) =>
        `//span[text()='${sessionName}']`,
        sessionMonthSelect:(sessionName: string) =>
            `(//div[text()='${sessionName}']/following::select[@class='flatpickr-monthDropdown-months'])[1]`,
        sessionYearSelect:(sessionName: string) =>
            `(//span[text()='${sessionName}']/following::input[@aria-label="Year"])[1]`,
        sessionTimeHours:(sessionName: string) =>
            `(//span[text()='${sessionName}']/following::input[@type="number"])[2]`,
        sessionTimeMinutes:(sessionName: string) =>
            `(//span[text()='${sessionName}']/following::input[@type="number"])[3]`,
        sessionSaveButton:(sessionName: string) =>
            `(//span[text()='${sessionName}']/following::input[@name="commit"])[1]`,
        yearSelect:"(//div[contains(text(),'Accelerator Kickoff')]/following::input[@aria-label='Year'])[1]",
        timeHours:"(//div[contains(text(),'Accelerator Kickoff')]/following::input[@type='number'])[2]",
        timeMinutes:"(//div[contains(text(),'Accelerator Kickoff')]/following::input[@type='number'])[3]",
        savetimeAndDate:"//div[contains(text(),'Accelerator Kickoff')]/following::input[@name='commit']",
        recruitingText:"((//span[contains(text(),'Dashboard')])[3]/following::span)[2]",
        semesterNameAndID:"((//div[contains(text(),'Semester')])[2]/following::div)[1]",
    },
    adminNewSemesterPage:{
        adminNewSemesterPageURL:"https://startcouncil.org/admin/new_semester",
        newSemesterIframe:"//iframe[@id='embedded_iframe']",
        semesterCity:"//select[@id='city']",
        semesterName:"(//div[@id='item']/child::input)[1]",
        acceleratorName:"//input[@id='semester_accelerator_name']",
        programFormat:"//select[@id='semester_program_format']",
        programType:"//select[@id='semester_program_type']",
        createSemester:"(//input[@type='submit'])[1]",

    }
    

};
