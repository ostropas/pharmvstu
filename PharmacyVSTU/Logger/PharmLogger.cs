using System;
using System.IO;
using Microsoft.Extensions.Logging;

namespace PharmacyVSTU.Logger
{
    public class PharmLoggerProvider : ILoggerProvider
    {
        public ILogger CreateLogger(string categoryName)
        {
            return new PharmLogger();
        }
 
        public void Dispose() { }
 
        private class PharmLogger : ILogger
        {
            public IDisposable BeginScope<TState>(TState state)
            {
                return null;
            }
 
            public bool IsEnabled(LogLevel logLevel)
            {
                return true;
            }

            public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
            {
                var currentTime = DateTime.UtcNow.ToString();
                var cFormatter = logLevel == LogLevel.Error || logLevel == LogLevel.Critical ? ErrorFormat : formatter; 
                File.AppendAllText("pharmacy.log", $"Time:[{currentTime}] Level:[{logLevel}] Log:[{cFormatter(state, exception)}]\n");
                Console.WriteLine(cFormatter(state, exception));
            }

            private string ErrorFormat<TState>(TState state, Exception e)
            {
                return $"{state} {e}";
            }

            
        }
    }
}