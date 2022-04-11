 
    gw_coords["b0fd0b7006640000"]= [41.31738, 2.01988]
    
    gw_coords["b0fd0b70069f0000"]= [41.32419, 2.14009]
    
    gw_coords["b0fd0b7006460000"]= [41.4832, 1.98652]
    
    gw_coords["b0fd0b7006160000"]= [41.28107, 1.98011]
  

  //handle checkbox click
  const filterGateways = () => {
    selectedGateways = [];
    var checkedBoxes = document.querySelectorAll('input[name="gateway-checkbox"]:checked');
    checkedBoxes.forEach( checkbox => {
      selectedGateways.push(checkbox.value);
    });

    // populate the context only with checked gateways
    const context = Object.keys(data).
    filter((key) => selectedGateways.includes(key)).
    reduce((cur, key) => { return Object.assign(cur, { [key]: data[key] })}, {});

    html = templateScript(context);
    $('#gateway-table').html(html);

    const gatewayCoords = {}
    selectedGateways.forEach(gateway => gatewayCoords[gateway] = gw_coords[gateway])

    //send checkbox selected gateways to django view
    $.ajax({
      type: 'POST',
      url: "/lorator/geowan/all_json",
      datatype: 'json',
      data:  JSON.stringify(gatewayCoords),
      success: function (response) {
        $("#wrapper").html(response);
      }
    })
  
  };  //end click handler

  var template = $('#handlebars-demo').html();

  //Compile the template data into a function
  var templateScript = Handlebars.compile(template);
</script>
