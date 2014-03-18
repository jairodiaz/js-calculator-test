moj.Modules.RSRCalc = (function() {
    "use strict";

    // Functions
    var init,
        testCall,
        calculateScore,
        dateDiff;

    // Calc vars

    var totalRSRY2 = 0;
    var score = 0;
    var OSPscore = 0;
    var ageAtMostRecentSexOffence = 0;
    var ageAtRiskDate = 0;
    var probabilityNonSexualViolenceY1 = 0;
    var probabilityNonSexualViolenceY2 = 0;
    var indecentImageProbabilityY1 = 0;
    var indecentImageProbabilityY2 = 0;
    var contactSexualProbabilityY1 = 0;
    var contactSexualProbabilityY2 = 0;
    var agePolynomial = 0;
    var ofmPolynomial = 0;
    var offenderOfm = 0;

    // Parameters
    var Intercept_1 = [1.78331927182645, 2.99795558254740];
    var Intercept_2 = [2.39022796091603, 3.60407707356772];

    //Sex
    var maleaai = [-0.508802063507919, -0.546062410902905];
    var maleaaiaai = [0.0153890192629454, 0.0170043887737295];
    var maleaaiaaiaai = [-0.000208800171123703, -0.000232716989498981];
    var maleaaiaaiaaiaai = [0.000000983824143383739, 0.000001094922933981];
    var female = [-16.69272926978470, -16.62202700890110];
    var aaifemale = [1.14364995500560, 1.09365106131567];
    var aaiaaifemale = [-0.0448159815299769, -0.042733609488121];
    var aaiaaiaaifemale = [0.000731812620052307, 0.000697583963826421];
    var aaiaaiaaiaaifemale = [-0.00000424504210770651, -0.00000404895085233227];

    //Offence categories
    var offenceCategoriesLookup = [[0.271350568105055, 0.304896300301182],[0.264445840395185, 0.326858080852591], [0.123617390798186, 0.151649692548355], [-0.225990540250696, -0.194200416367268], [0.156493599418026, 0.186977546333514], [-0.210828726274969, -0.212258595209629], [0.130461601097636, 0.0818982459627011], [0.081753216630546, 0.0694507822486554], [0.0923765737156082, 0.0841789642942883], [-0.0883945245425247, -0.136811424047985], [-0.211172350332101, -0.224505821312900], [0.00778028771796321, -0.0286442357674878], [-0.226808217378264, -0.215779995107354], [0.0206396832377319, 0.0446132016665715], [-0.407005679932105, -0.442179128494551], [-0.067383107093799, -0.0455228893277184], [0.0187611938936452, 0.0202407984946185], [0.194487131847261, 0.226781312933932], [-0.00653849840412098, 0.0192703822415124], [0.0819545573517356, -0.0169128022430282]];
    var vatpLookup = [[0,0], [0.41315945136753, 0.503126183131338], [0.261448353627646, 0.296194351653227], [0.200143106218146, 0.331898861349699], [0.204895023669854, 0.238802610774108]];

    //Criminal history
    var firstsanction = [-1.89458617745666, -2.09447596484765];
    var secondsanction = [-1.51763151836726, -1.67613460779912];
    var ogrs3_sanctionoccasions = [-0.0182592921752245, -0.0147495874606046];
    var malesecondsanctionyearssincefirs = [-0.0271828619470523, -0.0292205730647305];
    var femalesecondsanctionyearssincefi = [-0.0960719132524968, -0.0841673003341906];
    var ofm = [-0.0368447371150021, -0.038382727965819];
    var ofmofm = [0.000557887384281899, 0.000548515180678996];
    var ofmofmofm = [0.0000615531052486415, 0.0000662558757635182];
    var ofmofmofmofm = [-0.00000149652694510477, -0.00000159636460181398];
    var malethreeplussanctionsogrs4v_rat = [0.689153313085879, 0.769213898314811];
    var femalethreeplussanctionsogrs4v_r = [0.76704149890481, 0.793186572461819];
    var maleneverviolent = [-0.35940007303088, -0.942816163300621];
    var femaleneverviolent = [-1.75135363711310, -2.32321324569237];
    var onceviolent = [-0.101514048705338, -0.0633592949212861];
    var ogrs3_ovp_sanct = [0.021160895925655, 0.0188685880078656];
    var ogrs4v_rate_violent = [0.0549319831836878, 0.207442427665471];

    //OASys
    var S2Q2A = 0.15071282416667;
    var S3Q4 = 0.0619710049121293;
    var S4Q2 = 0.0389109699626767;
    var S6Q4 = 0.0259107268767618;
    var S9Q1 = 0.0935672441515258;
    var S9Q2 = 0.0567127896345591;
    var S11Q2 = 0.077212834605957;
    var S11Q4 = 0.0482892034688302;
    var S12Q1 = 0.130830533773332;
    var S6Q7_PERP = 0.0847839330659903;
    var pasthomicide = 0.399463399258737;
    var pastwoundinggbh = 0.451029720739399;
    var pastkidnap = 0.0749101406070305;
    var pastfirearm = 0.218055028351022;
    var pastrobbery = 0.163248217650296;
    var pastaggrburg = 0.506616685297771;
    var pastweapon = 0.184104582611966;
    var pastcdlife = 0.357345708081477;
    var pastarson = 0.12261588608151;


    init = function() {
       console.log("Running module");
    };

    testCall = function(msg) {
      console.log(msg);
    };

    calculateScore = function(o) {
      console.log ("Calculating score..."  + parseInt(o.allSanctions));

      //console.log(o);
      var ageatsanction = Math.floor((dateDiff(o.convictionDate, o.birthDate) / (24*3600*1000*365.2425)));;
      //console.log("ageatsanction: " + ageatsanction);
      var ageatfirstsanction;
      var sanctionoccasions =  parseInt(o.allSanctions);
      var ogrs4v_length_general;
      var ogrs4v_rate_general;


      var s = o.oasysInterview;

      //console.log("S: " + s);
      sanctionoccasions++;
      //console.log("sanctionoccasions + 1: " + sanctionoccasions);

      score = 0;

      ageAtRiskDate = Math.floor((dateDiff(o.sentenceDate, o.birthDate) / (24*3600*1000*365.2425)));

      // Age & sex polynomial
      if (o.sex == "0") { // if male
        agePolynomial = Math.pow(ageAtRiskDate, 1) * maleaai[s] + Math.pow(ageAtRiskDate, 2) * maleaaiaai[s] +  Math.pow(ageAtRiskDate, 3) * maleaaiaaiaai[s] +  Math.pow(ageAtRiskDate, 4) * maleaaiaaiaaiaai[s];
      } else if (o.sex == "1") { // if female
        agePolynomial = female[s] + Math.pow(ageAtRiskDate, 1) * aaifemale[s] + Math.pow(ageAtRiskDate, 2) * aaiaaifemale[s] +  Math.pow(ageAtRiskDate, 3) * aaiaaiaaifemale[s] +  Math.pow(ageAtRiskDate, 4) * aaiaaiaaiaaifemale[s];
      }

      score += agePolynomial;
      //console.log('agePolynomial: ' + agePolynomial);
      //console.log('score: ' + score);

      //OGRS4 offence category
      score += offenceCategoriesLookup[parseInt(o.currentOffenceType)][s];
      //console.log('currentOffenceType: ' + offenceCategoriesLookup[parseInt(o.currentOffenceType)][s]);
      //console.log('score: ' + score);

      if (o.currentOffenceType == "18") { // If VATP
        score += vatpLookup[parseInt(o.violentOffenceCategory)][s];
        //console.log('violentOffenceCategory: ' + vatpLookup[parseInt(o.violentOffenceCategory)][s]);
      } else

      //sanctionoccasions = 1;
      //console.log('sanctionoccasions: ' + sanctionoccasions);

      //sanctionoccasions += parseInt(o.allSanctions);

      if (sanctionoccasions > 50) {
        sanctionoccasions = 50;
      }

      //console.log('sanctionoccasions: ' + sanctionoccasions);

      score += sanctionoccasions * ogrs3_sanctionoccasions[s];  // Multiply by total sanctions
      //console.log('ogrs3_sanctionoccasions: ' + ogrs3_sanctionoccasions[s]);
      //console.log('score: ' + score);

      if (sanctionoccasions == 1) { // 1 sanction
        score += firstsanction[s];
        //console.log('firstsanction: ' + firstsanction[s]);
        //console.log('score + firstsanction: ' + score);
      } else if (sanctionoccasions == 2) {  // 2 total sanctions
        ageatfirstsanction = Math.floor((dateDiff(o.firstSanctionDate, o.birthDate) / (24*3600*1000*365.2425)));
        //console.log('ageatfirstsanction: ' + ageatfirstsanction);

        score += secondsanction[s];
        //console.log('secondsanction: ' + secondsanction[s]);
        //console.log('score + secondsanction: ' + score);

        //console.log("Years since first sanction: " + Math.floor((dateDiff(o.convictionDate, o.firstSanctionDate) / (24*3600*1000*365.2425))));

        if (o.sex == "0") { // if male or female
          score += Math.floor((dateDiff(o.convictionDate, o.firstSanctionDate) / (24*3600*1000*365.2425))) * malesecondsanctionyearssincefirs[s];
          //console.log('malesecondsanctionyearssincefirs: ' + Math.floor((moj.Modules.RSRApp.(o.convictionDate, o.firstSanctionDate) / (24*3600*1000*365.2425))) * malesecondsanctionyearssincefirs[s]);
        } else if (o.sex == "1") {
          //console.log('femalesecondsanctionyearssincefi: ' + Math.floor((dateDiff(o.convictionDate, o.firstSanctionDate) / (24*3600*1000*365.2425))) * femalesecondsanctionyearssincefi[s]);

          score += Math.floor(dateDiff(o.convictionDate, o.firstSanctionDate) / (24*3600*1000*365.2425)) * femalesecondsanctionyearssincefi[s];
        }

      } else if (sanctionoccasions >= 3) {  // 3+ total sanctions

        ageatfirstsanction = Math.floor((dateDiff(o.firstSanctionDate, o.birthDate) / (24*3600*1000*365.2425)));
        //console.log('ageatfirstsanction: ' + ageatfirstsanction);

        ogrs4v_length_general = (ageatsanction - ageatfirstsanction) + 12;
        //console.log('ogrs4v_length_general: ' + ogrs4v_length_general);
        ogrs4v_rate_general = sanctionoccasions / ogrs4v_length_general;
        //console.log('ogrs4v_length_general: ' + ogrs4v_length_general);
        ogrs4v_rate_general = Math.log(ogrs4v_rate_general);

        //console.log('ogrs4v_rate_general: ' + ogrs4v_rate_general);

        if (o.sex == "0") { // if male or female
          score += ogrs4v_rate_general * malethreeplussanctionsogrs4v_rat[s];
          //console.log('score + ogrs4v_rate_general m: ' + score);
        } else if (o.sex == "1") {
          score += ogrs4v_rate_general * femalethreeplussanctionsogrs4v_r[s];
          //console.log('score + ogrs4v_rate_general f: ' + score);
        }

      }

      offenderOfm = Math.floor((dateDiff(o.assessmentDate, o.sentenceDate) / (24*3600*1000*(365.2425/12))));
      //console.log('Offence-free months: ' + offenderOfm);

      ofmPolynomial = Math.pow(offenderOfm, 1) * ofm[s] + Math.pow(offenderOfm, 2) * ofmofm[s] +  Math.pow(offenderOfm, 3) * ofmofmofm[s] +  Math.pow(offenderOfm, 4) * ofmofmofmofm[s];
      score += ofmPolynomial;

      //console.log('ofm: ' + ofmPolynomial);
      //console.log('score + ofm: ' + score);

      if (parseInt(o.violentSanctions) > 0) { // if previous violent offences

        score += parseInt(o.violentSanctions) * ogrs3_ovp_sanct[s];
        //console.log('violentSanctions * ogrs3_ovp_sanct: ' + parseInt(o.violentSanctions) * ogrs3_ovp_sanct[s]);

        if (parseInt(o.violentSanctions) == 1) {  // if one violent sanction
          score += onceviolent[s];
          //console.log('score + onceviolent: ' + score);
        }

        var ogrs4v_length_violent_val = (ageatsanction - ageatfirstsanction) + 30;
        //console.log
        //console.log("ogrs4v_length_violent_val: " + ogrs4v_length_violent_val);
        //console.log("o.violentSanctions: " + o.violentSanctions);

        var ogrs4v_rate_violent_val;

        ogrs4v_rate_violent_val = parseInt(o.violentSanctions) / ogrs4v_length_violent_val;
        //console.log('ogrs4v_rate_violent_val: ' + ogrs4v_rate_violent_val);
        ogrs4v_rate_violent_val = Math.log(ogrs4v_rate_violent_val);
        //console.log('ogrs4v_rate_violent_val (log): ' + ogrs4v_rate_violent_val);

        //console.log("ogrs4v_rate_violent[s]: " + ogrs4v_rate_violent[s]);
        score += ogrs4v_rate_violent_val * ogrs4v_rate_violent[s];
        //console.log('score + ogrs4v_rate_violent_val * ogrs4v_rate_violent: ' + score);

      } else { // if no violent offences

        ogrs4v_rate_violent = 0;

        if (o.sex == "0") { // if male or female
          score += maleneverviolent[s];
          //console.log('score + maleneverviolent: ' + score);
        } else if (o.sex == "1") {
          score += femaleneverviolent[s];
          //console.log('score + femaleneverviolent: ' + score);
        }
      }

      // OASys

      var oasys = 0;

      if (o.murder == "0") {
        oasys += pasthomicide;
        //console.log("pasthomicide: " + pasthomicide);
      }
      if (o.wounding == "0") {
        oasys += pastwoundinggbh;
        //console.log("pastwoundinggbh: " + pastwoundinggbh);
      }
      if (o.burglary == "0") {
        oasys += pastaggrburg;
        //console.log("pastaggrburg: " + pastaggrburg);
      }
      if (o.arson == "0") {
        oasys += pastarson;
        //console.log("pastarson: " + pastarson);
      }
      if (o.endagerLife == "0") {
        oasys += pastcdlife;
        //console.log("pastcdlife: " + pastcdlife);
      }
      if (o.kidnapping == "0") {
        oasys += pastkidnap;
        //console.log("pastkidnap: " + pastkidnap);
      }
      if (o.firearmPossession == "0") {
        oasys += pastfirearm;
        //console.log("pastfirearm: " + pastfirearm);
      }
      if (o.robbery == "0") {
        oasys += pastrobbery;
        //console.log("pastrobbery: " + pastrobbery);
      }
      if (o.anyOtherOffence == "0") {
        oasys += pastweapon;
        //console.log("pastweapon: " + pastweapon);
      }
      if (o.useWeapon == "0") {
        oasys += S2Q2A;
        //console.log("S2Q2A: " + S2Q2A);

      }

      if (o.accommodation != "") {
        oasys += parseInt(o.accommodation) * S3Q4;
        //console.log("accommodation: " + parseInt(o.accommodation) * S3Q4);
      }
      if (o.employment == "0") {
        oasys += 2*S4Q2;
        //console.log("employment: " + 2*S4Q2);
      }
      if (o.relationship != "") {
        oasys += parseInt(o.relationship) * S6Q4;
        //console.log("relationship: " + parseInt(o.relationship) * S6Q4);
      }
      if (o.domesticViolence == "0") {
        oasys += S6Q7_PERP;
        //console.log("S6Q7_PERP: " + S6Q7_PERP);
      }
      if (o.currentUseOfAlcohol != "") {
        oasys += parseInt(o.currentUseOfAlcohol) * S9Q1;
        //console.log("currentUseOfAlcohol: " + parseInt(o.currentUseOfAlcohol) * S9Q1);
      }
      if (o.bingeDrinking != "") {
        oasys += parseInt(o.bingeDrinking) * S9Q2;
        //console.log("bingeDrinking: " + parseInt(o.bingeDrinking) * S9Q2);
      }
      if (o.impulsivity != "") {
        oasys += parseInt(o.impulsivity) * S11Q2;
        //console.log("impulsivity: " + parseInt(o.impulsivity) * S11Q2);
      }
      if (o.temper != "") {
        oasys += parseInt(o.temper) * S11Q4;
        //console.log("temper: " + parseInt(o.temper) * S11Q4);
      }
      if (o.proCriminal != "") {
        oasys += parseInt(o.proCriminal) * S12Q1;
        //console.log("proCriminal: " + parseInt(o.proCriminal) * S12Q1);
      }

      //console.log("oasys: " + oasys);

      score += oasys;
      //console.log('score + OASys: ' + score);

      // Probability of non sexual violence
      probabilityNonSexualViolenceY1 = (Math.exp(Intercept_1[s] + score)) / (1 + (Math.exp(Intercept_1[s] + score)));
      probabilityNonSexualViolenceY2 = (Math.exp(Intercept_2[s] + score)) / (1 + (Math.exp(Intercept_2[s] + score)));

      //console.log('probabilityNonSexualViolenceY2: ' + probabilityNonSexualViolenceY2);

      // Probability of sexual violence
      if (o.sexualOffenceHistory == "1" && o.sexualElement == "1") { // if no sexual element or previous sexual offences (i.e. non-sexual offender)

        //totalRSRY1 = probabilityNonSexualViolenceY1;
        totalRSRY2 = probabilityNonSexualViolenceY2;

      } else if (o.sexualOffenceHistory == "0" || o.sexualElement == "0") {  // if either sexual element or previous sexual offences (i.e. sexual offender)

        if (o.sex == "0") { // if male
          if (o.sexualOffenceHistory == "0") { // if previous sexual offences

            if (parseInt(o.indecentImage) > 1) {
              indecentImageProbabilityY1=0.038087;
              indecentImageProbabilityY2=0.057949;
            } else if (parseInt(o.indecentImage) == 1) {
              indecentImageProbabilityY1=0.018237;
              indecentImageProbabilityY2=0.02805;
            } else if (parseInt(o.contactChild) > 1) {
              indecentImageProbabilityY1=0.004615;
              indecentImageProbabilityY2=0.007151;
            } else if (parseInt(o.contactChild) == 1) {
              indecentImageProbabilityY1=0.00224;
              indecentImageProbabilityY2=0.003476;
            // IMPORTANT: double check with Philip if this should actually work like this
            } else if (parseInt(o.contactAdult) > 0 || parseInt(o.paraphilia) > 0) {
              indecentImageProbabilityY1=0.000683;
              indecentImageProbabilityY2=0.001061;
            }

          } else { // if no previous sexual offences
            indecentImageProbabilityY1=0.000098;
            indecentImageProbabilityY2=0.000152;
          }
        } else if (o.sex == "1") { // if female (Question: does that mean that only male offenders are involved in online sexual offences?)
          indecentImageProbabilityY1 = 0;
          indecentImageProbabilityY2 = 0;
        }

        //console.log('indecentImageProbabilityY2: ' + indecentImageProbabilityY2);

        // Calculate OSPscore
        OSPscore = 0;

        if (parseInt(o.contactAdult) == 0) {
          OSPscore += 0;
          //console.log('OSPscore: ' + OSPscore);
        } else if (parseInt(o.contactAdult) == 1) {
          OSPscore += 3;
          //console.log('OSPscore: ' + OSPscore);
        } else if (parseInt(o.contactAdult) == 2) {
          OSPscore += 5;
          //console.log('OSPscore: ' + OSPscore);
        } else if (parseInt(o.contactAdult) > 2) {
          OSPscore += 8;
          //console.log('OSPscore: ' + OSPscore);
        }

        if (parseInt(o.contactChild) == 0) {
          OSPscore += 0;
          //console.log('OSPscore: ' + OSPscore);
        } else if (parseInt(o.contactChild) == 1) {
          OSPscore += 2;
          //console.log('OSPscore: ' + OSPscore);
        } else if (parseInt(o.contactChild) == 2) {
          OSPscore += 3;
          //console.log('OSPscore: ' + OSPscore);
        } else if (parseInt(o.contactChild) > 2) {
          OSPscore += 4;
          //console.log('OSPscore: ' + OSPscore);
        }

        if (parseInt(o.paraphilia) == 0) {
          OSPscore += 0;
          //console.log('OSPscore 0 paraphilia: ' + OSPscore);
        } else if (parseInt(o.paraphilia) == 1) {
          OSPscore += 1;
          //console.log('OSPscore 1: ' + OSPscore);
        } else if (parseInt(o.paraphilia) == 2) {
          OSPscore += 2;
          //console.log('OSPscore 2: ' + OSPscore);
        } else if (parseInt(o.paraphilia) > 2) {
          OSPscore += 3;
          //console.log('OSPscore > 2 paraphilia: ' + OSPscore);
        }

        if (parseInt(o.allSanctions) > 0) {
          OSPscore += 3;
          //console.log('OSPscore + allSanctions: ' + OSPscore);
        }
        if (o.strangerVictim == '0') {
          OSPscore += 2;
          //console.log('OSPscore + strangerVictim: ' + OSPscore);
        }

        ageAtMostRecentSexOffence = Math.floor((dateDiff(o.mostRecentSexualOffence, o.birthDate) / (24*3600*1000*365.2425)));

        //console.log('ageAtMostRecentSexOffence: ' + ageAtMostRecentSexOffence);



        if (ageAtMostRecentSexOffence > 17) {
          //console.log('OSPscore 17: ' + OSPscore);
          OSPscore += 5;
        } else if (ageAtMostRecentSexOffence > 15) {
          //console.log('OSPscore 15: ' + OSPscore);
          OSPscore += 3;
        } else if (ageAtMostRecentSexOffence > 9) {
          //console.log('OSPscore 9: ' + OSPscore);
          OSPscore += 0;
        }



        //console.log('ageAtRiskDate: ' + ageAtRiskDate);

        if (ageAtRiskDate > 59) {
          //console.log('OSPscore 59: ' + OSPscore);
          OSPscore += 0;
        } else if (ageAtRiskDate > 53) {
          //console.log('OSPscore 53: ' + OSPscore);
          OSPscore += 1;
        } else if (ageAtRiskDate > 47) {
          //console.log('OSPscore 47: ' + OSPscore);
          OSPscore += 2;
        } else if (ageAtRiskDate > 41) {
          //console.log('OSPscore 41: ' + OSPscore);
          OSPscore += 3;
        } else if (ageAtRiskDate > 35) {
          //console.log('OSPscore 35: ' + OSPscore);
          OSPscore += 4;
        } else if (ageAtRiskDate > 29) {
          //console.log('OSPscore 29: ' + OSPscore);
          OSPscore += 5;
        } else if (ageAtRiskDate > 23) {
          //console.log('OSPscore 23: ' + OSPscore);
          OSPscore += 6;
        } else if (ageAtRiskDate > 9) {
          //console.log('OSPscore 9: ' + OSPscore);
          OSPscore += 7;
        }
        //console.log('OSPscore: ' + OSPscore);

        // Contact sexual probability
        if (o.sex == "0") { // if male
          var z1 = -8.817398615 + (0.2545385404 * OSPscore);
          var z2 = -8.216503478 + (0.2545385404 * OSPscore);
          contactSexualProbabilityY1 = Math.exp(z1) / (1 + Math.exp(z1));
          contactSexualProbabilityY2 = Math.exp(z2) / (1 + Math.exp(z2));
        } else if (o.sex == "1") { // if female
          contactSexualProbabilityY1 = 1 / 193;
          contactSexualProbabilityY2 = 1 / 193;
        }

        //console.log('contactSexualProbabilityY2: ' + contactSexualProbabilityY2);

        //totalRSRY1 = probabilityNonSexualViolenceY1 + indecentImageProbabilityY1 + contactSexualProbabilityY1;
        totalRSRY2 = probabilityNonSexualViolenceY2 + indecentImageProbabilityY2 + contactSexualProbabilityY2;

        //console.log('totalRSRY2: ' + totalRSRY2);
      }

      //scoreCard( scoreNum, band, bandLabel, desc )
      //scoreCard(totalRSRY1, 'low', 'Low', 'Likelihood of <strong>serious</strong> reoffending over the next year.');

      // Result
      console.log("TOTAL Y2: " + totalRSRY2);

      return totalRSRY2;

      // if (indecentImageProbabilityY1 != 0) {
      //  scoreCard(indecentImageProbabilityY1, 'low', 'Low', 'Likelihood of <strong>indecent image</strong> reoffending over the next year.');
      //  scoreCard(indecentImageProbabilityY2, 'low', 'Low', 'Likelihood of <strong>indecent image</strong> reoffending over the next two years.');
      // }

      // if (contactSexualProbabilityY1 != 0) {
      //  scoreCard(contactSexualProbabilityY1, 'low', 'Low', 'Likelihood of <strong>contact sexual</strong> reoffending over the next year.');
      //  scoreCard(contactSexualProbabilityY2, 'low', 'Low', 'Likelihood of <strong>contact sexual</strong> reoffending over the next two years.');
      // }


  };

  dateDiff = function(date1, date2) {

    console.log("TYPE: " + typeof(date1));
    var result;
    var d1 = date1;
    var d2 = date2;

    result = d1 - d2;

    if (d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth()) {
      result += 86400000;
    }

    return result;
  };
   // public

  return {
    init: init,
    testCall: testCall,
    calculateScore: calculateScore
  };
}());


