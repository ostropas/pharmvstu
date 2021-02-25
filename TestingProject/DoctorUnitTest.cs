using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.VisualStudio.TestTools.UnitTesting.Logging;
using PharmacyVSTU.Controllers;

namespace TestingProject
{
    [TestClass]
    public class DoctorUnitTest
    {
        [TestMethod]
        public void TestDoctorMethod()
        {
            var controller = new DoctorController(null, null);
            Assert.AreEqual(controller.GetCurrentDoctorInfo(), "It works");
        }
    }
}