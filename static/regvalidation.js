
$(document).on('submit', '#addform1', function(e) {
    
    e.preventDefault();

   var fName= $('#fNameid').val();
   var lName= $('#lNameid').val();
   var username= $('#usernameid').val();
   var email= $('#emailId').val();
   var gender= $('#genderid').val();
   var password= $('#passwordid').val();
   var repassword= $('#retypedPasswordid').val();
   var userpix= $('#userpixid').val();
 
   function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }

  


    if (fName =="" ||  hasWhiteSpace(fName)){
        document.getElementById('fNameError').innerHTML="** Please fill the First Name";
      
    }
    else{
        document.getElementById('fNameError').innerHTML="";
    }

    if (lName =="" ||  hasWhiteSpace(lName)){
        document.getElementById('lNameError').innerHTML="** Please fill the Last Name";
     
    }
    else{
        document.getElementById('lNameError').innerHTML="";
    }
    if (username =="" ||  hasWhiteSpace(username)){
        document.getElementById('usernameError').innerHTML="** Please fill Your Username";
      
    }
    else{
        document.getElementById('usernameError').innerHTML="";
    }

    if (email =="" ||  hasWhiteSpace(email)){
        document.getElementById('emailError').innerHTML="** Please fill the Email feilds";
     
    }
    else{
        document.getElementById('emailError').innerHTML="";
    }

    if (gender =="" ||  hasWhiteSpace(gender)){
        document.getElementById('gendererror').innerHTML="** Please Enter your Gender";
      
    }
    else{
        document.getElementById('gendererror').innerHTML="";
    }

    if (password =="" ||  hasWhiteSpace(password)){
        document.getElementById('passwordError').innerHTML="** Please fill Your password";
     
    }
    else{
        document.getElementById('passwordError').innerHTML="";
    }

    if (repassword =="" ||  hasWhiteSpace(repassword)){
        document.getElementById('retypedpasswordError').innerHTML="** Please confirm Your password";
      
    }
    else{
        document.getElementById('retypedpasswordError').innerHTML="";
    }

    if (userpix =="" ||  hasWhiteSpace(userpix)){
        document.getElementById('userpixerror').innerHTML="** Please upload your picture";
      
    }
    else{
        document.getElementById('userpixerror').innerHTML="";
    }


    if ( hasWhiteSpace(fName) ||  hasWhiteSpace(lName) ||  hasWhiteSpace(username) ||  hasWhiteSpace(email) ||  hasWhiteSpace(gender) ||  hasWhiteSpace(password) ||  hasWhiteSpace(repassword) ||  hasWhiteSpace(userpix) ) return false;
    
    
    if (fName=='' || lName=='' || username==''|| gender==''|| password==''|| repassword==''|| userpix==''|| email=='') return false;

    $.ajax({
        type: 'POST',
        url: '/registration',
        data:JSON.stringify({
            fName: $('#fNameid').val(),
            lName: $('#lNameid').val(),
            username: $('#usernameid').val(),
            email: $('#emailid').val(),
            gender: $('#genderid').val(),
            password: $('#passwordid').val(),
        }),
        contentType: 'application/json',
        
        beforeSend: function(){
            document.getElementById('btn').value="Submitted"
        },
    
        success: function(data){
           

            if (data.error){
                $('#errorAlert').text(data.error).show();
                $('#successAlert').hide();
            }
            else{
                $('#successAlert').text(data.message).show();
                $('#errorAlert').hide();
                // window.location='/datatable'
            }
            
        document.getElementById('fNameid').value="";
        document.getElementById('lNameid').value="";
        document.getElementById('usernameid').value="";
        document.getElementById('emailid').value="";
        document.getElementById('genderid').value="";
        document.getElementById('passwordid').value="";
        document.getElementById('userpixid').value="";
                    
                },
                
                
        statusCode : {
            403 : function(){
                    alert('method forbidden')
            },
            500 : function(){
                alert('internal server error')
        },
        404 : function(){
            alert('not found')
    },
        },                 error : function(XMLHttpRequest, textStatus, errorThrown){
                                }
    });
});
