using System;
using PharmacyVSTU.Controllers;
using Xunit;

namespace UnitTesting
{
    public class DoctorTest
    {
        [Fact]
        public void DoctorInfo()
        {
            var controller = new DoctorController(null, null);
            //Assert.Equal(controller.GetCurrentDoctorInfo(), "It works");
        }
    }
}