// Lýsa yfir föstum
const standard_cost1 = 15426 //leikskólagjald fyrir fyrsta barn
const standard_cost2 = 23139 //leikskólagjald fyrir auka barn/börn (aldrei meira en 1 og 1/2 fullt gjald)
const food_small = 8457 //kostnaður fyrir hálft fæði (6 tíma dvöl eða minna)
const food_big = 11190 //kostnaður fyrir fullt fæði (6 tíma dvöl eða meira)
const hour_cost_big = 3857 //leikskólagjald á hvert kortér fyrir fyrsta barn
const hour_cost_mega = 5785 //leikskólagjald á hvert kortér ef börnin eru fleiri en 1
const hour_cost_akb = 42556 //kostnaður bæjarins fyrir hvern klukkutíma á hvert barn


// Lýsa yfir global breytum
var quantity //fjöldi barna
var extra_quantity //börn umfram eitt - notað í útreikningi
var hours //fjöldi tíma 
var hours_cost_extra //notað í útreikningi
var hours_cost_extra_children //notað í útreikningi
var time_cost_akb_first //notað í útreikningi
var time_cost_akb_whole //notað í útreikningi
var time_cost_akb_total //heildarkostnaður bæjarins
var result_div //notað fyrir útprentun
var time_cost //dvalarkostnaður
var food_cost //fæðiskostnaður
var result //lokaniðurstaða
var result_with_discount //notað í útreikningi
var extra_hours //klst umfram 6 tíma á dag
var parentstatus //hjúskaparstaða
var parentstatus_toprint //notað fyrir útprentun
var income_single //tekjubil einstaklinga
var income_couple //tekjubil pars
var discount //notað í útreikningi
var discount_toprint //notað til að prenta út á skjá
var income_toprint //notað til að prenta út á skjá
var time_cost_toprint //notað til að prenta út á skjá
var discount_in_kronur //Afsláttur í krónum til að prenta á skjá


var time_cost_test
//var result_with_discount_test
     
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculate(){
    // Reiknar kostnað miðað við innsettar upplýsingar
    result_div = document.getElementById("result_div")
    quantity = Number(document.getElementById("quantity").value)
    hours = Number(document.getElementById("hours").value)
    //parentstatus =  (document.getElementsByClassName("Pstatus").id)
    income_single = document.getElementById("income_single").value
    income_couple = document.getElementById("income_couple").value

    if(quantity === 0 || hours === 0){
        result = 0
    }
    else{ 
    // Finna afsláttarprósentu og breyta tekjubili úr afsláttarprósentu fyrir útprentun á skjá
        if (income_single !== "999"){
                parentstatus = "Einn";
                discount = income_single;
        if (income_single === "0.625"){
                    income_toprint = "0 - 5.756.435";
                    discount_toprint = "62.5%";
            }else if( income_single === "0.5"){
                    income_toprint = "5.756.436 - 7.359.155";
                    discount_toprint = "50%";
                }
                else if( income_single === "0.25"){
                    income_toprint = "7.359.156 - 8.961.875";
                    discount_toprint = "25%";
                }
                    else if( income_single === "0.0"){
                    income_toprint = "8.961.876 +";
                    discount_toprint = "0%";
                }
            }

        
        else if (income_couple !== "999"){
            parentstatus = "Par";
            discount = income_couple;
            if (income_couple === "0.625"){
                income_toprint = "0 - 8.634.653";
                discount_toprint = "62.5%";
            }else if( income_couple=== "0.5"){
                income_toprint = "8.634.654 - 11.038.733";
                discount_toprint = "50%";
            }
            else if( income_couple === "0.25"){
                income_toprint = "11.038.734 - 13.442.813";
                discount_toprint = "25%";
            }
            else if( income_couple === "0.0"){
                income_toprint = "13.442.814 +";
                discount_toprint = "0%";
            }
        }
    }
//Reikna dvalarkostnað með afslætti
        if(quantity === 1){
            if(hours <= 6){
                time_cost = 0;
                extra_hours = 0;
            }else if (hours > 6 && hours <= 8.5){
                extra_hours = (hours - 6);
                hours_cost_extra = (standard_cost1 * extra_hours);
                time_cost_test = hours_cost_extra;
                if(discount !== "0.0"){
                    time_cost = (hours_cost_extra - (hours_cost_extra * discount));
                } else {
                    time_cost = hours_cost_extra;
                }
                      
            }
        }
        if(quantity > 1){

                if(hours <= 6){
                    time_cost = 0;
                    extra_hours = 0;
                }
            if(hours > 6 && hours <= 8.5){      
                extra_hours = (hours- 6);
                hours_cost_extra = (standard_cost2 * extra_hours);
                if(discount !== "0.0"){
                    time_cost = (hours_cost_extra - ( hours_cost_extra * discount));
                } else {
                    time_cost = hours_cost_extra;
                }
                
            }
        }

    // Reikna matarkostnað miðað við fjölda klukkustunda og barna
    if(hours <= 6){
            food_cost = (food_small * quantity);
    } else if( hours > 6){
            food_cost = (food_big * quantity);  
        } 
    
    //Reikna út heildarkostnað foreldra
    if (time_cost > 0){
        result = (time_cost + food_cost);
    } else { 
        result = food_cost;
    }

  //Reikna út heildarkostnað Akureyrarbæjar
  time_cost_akb_first = (quantity * hours);
  time_cost_akb_whole = ( time_cost_akb_first * hour_cost_akb);
  time_cost_akb_total = (time_cost_akb_whole - time_cost);
    

    // Birtir niðurstöður 
    result_parent = Math.round(result);
    result_akb = Math.round(time_cost_akb_total);
	time_cost = Math.round(time_cost);
	food_cost = Math.round(food_cost);
	time_cost = numberWithCommas(time_cost);
	food_cost = numberWithCommas(food_cost);
	result_parent = numberWithCommas(result_parent);
    result_akb = numberWithCommas(result_akb);

		if(quantity > 1){
		children = "börn";
	} else{
		children = "barn";
	}
    if (parentstatus === "Einn"){
        parentstatus_toprint = "foreldri sem er ekki í sambúð";

    } else if (parentstatus === "Par"){
        parentstatus_toprint = "foreldra í sambúð";

    }
    result_div.innerHTML = "<h3>Mánaðargjald: "+result_parent+" kr.</h3><p><strong>Vinsamlegast athugið að reiknivélin er eingöngu til viðmiðunar.</strong> Fleiri atriði geta komið fram á reikningi, svo sem bleyjusjóður og skráningardagar. Hægt er að skoða sundurliðaðan reikning í <a href=\"https://thjonustugatt2.akureyri.is/\" target=\"_blank\">þjónustugátt Akureyrarbæjar</a>.</p> <p>Að vera með "+quantity+" "+children+" í "+hours+" klukkutíma á dag kostar "+result_parent+" kr. á mánuði fyrir "+parentstatus_toprint+" með árstekjur á bilinu: "+income_toprint+" kr. á árinu 2024.</p><p><strong>Sundurliðun: </strong></p><p>Miðað við þínar forsendur eru áætluð leikskólagjöld eftirfarandi: </p><p><strong>Skólagjald:</strong> "+time_cost+" kr.</p><p><strong>Fæðisgjald:</strong> "+food_cost+" kr.</p><strong><p>Afsláttur af skólagjaldi vegna tekna:</strong> "+discount_toprint+" prósent</p><p><strong>Samtals: "+result_parent+" kr.</strong></p><p>Kostnaðarhlutdeild Akureyrarbæjar: "+result_akb+" kr.</p>"
}